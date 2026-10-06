"use client";
import { useState, useRef } from "react";
import { sip, inr, DEFAULT_SIP_RETURN } from "@/lib/finance";
import SliderInput from "./SliderInput";

export default function Compare() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [sipRate, setSipRate] = useState(DEFAULT_SIP_RETURN);
  const [depositRate, setDepositRate] = useState(7);
  const [hoverYear, setHoverYear] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Compute series for 0 to `years`
  const sipSeries = Array.from({ length: years + 1 }, (_, t) => sip(monthly, sipRate, t));
  const depSeries = Array.from({ length: years + 1 }, (_, t) => sip(monthly, depositRate, t));
  const putSeries = Array.from({ length: years + 1 }, (_, t) => monthly * t * 12);

  const totalPut = monthly * years * 12;
  const finalSip = sip(monthly, sipRate, years);
  const finalDep = sip(monthly, depositRate, years);
  const diff = finalSip - finalDep;

  // Chart dimensions and scaling
  const W = 480;
  const H = 200;
  const padL = 36;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const maxVal = Math.max(...sipSeries, ...depSeries, 1);

  const getX = (t: number) => padL + (t / years) * chartW;
  const getY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const sipPath = sipSeries.map((v, i) => `${i === 0 ? "M" : "L"}${getX(i).toFixed(1)} ${getY(v).toFixed(1)}`).join(" ");
  const depPath = depSeries.map((v, i) => `${i === 0 ? "M" : "L"}${getX(i).toFixed(1)} ${getY(v).toFixed(1)}`).join(" ");

  const activeY = hoverYear !== null ? Math.min(Math.max(0, hoverYear), years) : years;
  const activeSip = sipSeries[activeY];
  const activeDep = depSeries[activeY];
  const activePut = putSeries[activeY];

  const updateYearFromX = (clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const normX = (xPos / rect.width) * W;
    const t = Math.round(((normX - padL) / chartW) * years);
    if (t >= 0 && t <= years) {
      setHoverYear(t);
    }
  };

  const handleSvgMove = (e: React.MouseEvent<SVGSVGElement>) => {
    updateYearFromX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      updateYearFromX(e.touches[0].clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setHoverYear((prev) => (prev === null ? Math.min(years, 1) : Math.min(years, prev + 1)));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setHoverYear((prev) => (prev === null ? Math.max(0, years - 1) : Math.max(0, prev - 1)));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHoverYear(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHoverYear(years);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
      {/* Inputs Column */}
      <div className="rounded-[10px] border border-line bg-surface p-6 sm:p-8">
        <h3 className="font-serif text-2xl text-ink">Adjust comparison inputs</h3>
        <p className="mt-1 text-xs text-muted">See how rates and compounding affect growth.</p>
        <div className="mt-6 space-y-5">
          <SliderInput
            id="compare-monthly"
            label="Monthly amount"
            min={500}
            max={100000}
            step={500}
            value={monthly}
            unit="₹"
            onChange={setMonthly}
          />
          <SliderInput
            id="compare-years"
            label="Time period"
            min={1}
            max={30}
            step={1}
            value={years}
            unit="yrs"
            onChange={setYears}
          />
          <SliderInput
            id="compare-sip-rate"
            label="SIP expected return"
            min={6}
            max={15}
            step={0.5}
            value={sipRate}
            unit="%"
            helperNote="An assumption, not a promise. Real returns vary year to year."
            onChange={setSipRate}
          />
          <SliderInput
            id="compare-dep-rate"
            label="Bank deposit rate"
            min={4}
            max={9}
            step={0.25}
            value={depositRate}
            unit="%"
            onChange={setDepositRate}
          />
        </div>
        <p className="mt-6 text-xs text-muted">
          Deposit rate calculation: Fixed rate, compounded monthly, simplified.
        </p>
      </div>

      {/* Chart & Summary Column */}
      <div className="rounded-[10px] border border-line bg-surface p-6 sm:p-8" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-primary" aria-hidden />
              <span>SIP ({sipRate}%)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-accent" aria-hidden />
              <span>Deposit ({depositRate}%)</span>
            </span>
          </div>
          <span className="text-xs text-muted">Hover, tap, or use arrow keys</span>
        </div>

        {/* SVG Chart with Keyboard & Touch interaction */}
        <figure
          className="mt-5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          tabIndex={0}
          role="region"
          aria-label={`Interactive comparison chart for ${years} years. Currently viewing year ${activeY}. Use arrow keys to explore.`}
          onKeyDown={handleKeyDown}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full touch-none select-none"
            role="img"
            aria-hidden="true"
            onMouseMove={handleSvgMove}
            onMouseLeave={() => setHoverYear(null)}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
          >
            {/* Grid line at bottom */}
            <line
              x1={padL}
              y1={padT + chartH}
              x2={padL + chartW}
              y2={padT + chartH}
              stroke="var(--color-line)"
              strokeWidth="1"
            />

            {/* SIP Area & Line */}
            <path
              d={`${sipPath} L${getX(years).toFixed(1)} ${(padT + chartH).toFixed(1)} L${getX(0).toFixed(1)} ${(padT + chartH).toFixed(1)} Z`}
              className="fill-primary/10"
            />
            <path
              d={sipPath}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Deposit Area & Line */}
            <path
              d={`${depPath} L${getX(years).toFixed(1)} ${(padT + chartH).toFixed(1)} L${getX(0).toFixed(1)} ${(padT + chartH).toFixed(1)} Z`}
              className="fill-accent/10"
            />
            <path
              d={depPath}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Hover vertical line and dots */}
            {hoverYear !== null && (
              <g aria-hidden>
                <line
                  x1={getX(activeY)}
                  y1={padT}
                  x2={getX(activeY)}
                  y2={padT + chartH}
                  stroke="var(--color-ink)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.4"
                />
                <circle
                  cx={getX(activeY)}
                  cy={getY(activeSip)}
                  r="5"
                  className="fill-surface stroke-primary"
                  strokeWidth="2.5"
                />
                <circle
                  cx={getX(activeY)}
                  cy={getY(activeDep)}
                  r="5"
                  className="fill-surface stroke-accent"
                  strokeWidth="2.5"
                />
              </g>
            )}

            {/* X-Axis labels */}
            <text x={padL} y={H - 8} className="fill-muted text-[11px]" textAnchor="start">
              Year 0
            </text>
            {years > 2 && (
              <text x={getX(Math.round(years / 2))} y={H - 8} className="fill-muted text-[11px]" textAnchor="middle">
                Year {Math.round(years / 2)}
              </text>
            )}
            <text x={padL + chartW} y={H - 8} className="fill-muted text-[11px]" textAnchor="end">
              Year {years}
            </text>
          </svg>

          {/* Interactive readout bar: at least 14px on mobile, 13px on desktop, 2-col on narrow */}
          <div className="mt-3 rounded-md bg-paper p-3 text-[14px] text-ink sm:text-[13px] md:text-sm">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
              <span className="font-semibold text-ink">
                {hoverYear !== null ? `Year ${activeY} point` : `After ${years} years`}
              </span>
              <span className="text-muted">
                Put in: <strong className="font-medium text-ink tabular-nums">{inr(activePut)}</strong>
              </span>
              <span className="text-primary font-medium">
                SIP: <strong className="tabular-nums">{inr(activeSip)}</strong>
              </span>
              <span className="text-accent font-medium">
                Deposit: <strong className="tabular-nums">{inr(activeDep)}</strong>
              </span>
            </div>
          </div>
        </figure>

        {/* 4 Summary Figures */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted">Total you put in</p>
            <p className="mt-1 font-serif text-xl tabular-nums text-ink">{inr(totalPut)}</p>
          </div>
          <div>
            <p className="text-xs text-muted">SIP value</p>
            <p className="mt-1 font-serif text-xl tabular-nums text-primary">{inr(finalSip)}</p>
            <p className="text-[11px] text-muted">+{inr(finalSip - totalPut)} gain</p>
          </div>
          <div>
            <p className="text-xs text-muted">Bank deposit</p>
            <p className="mt-1 font-serif text-xl tabular-nums text-accent">{inr(finalDep)}</p>
            <p className="text-[11px] text-muted">+{inr(finalDep - totalPut)} gain</p>
          </div>
          <div>
            <p className="text-xs text-muted">SIP difference</p>
            <p className="mt-1 font-serif text-xl tabular-nums text-ink">
              {diff >= 0 ? `+${inr(diff)}` : `-${inr(Math.abs(diff))}`}
            </p>
            <p className="text-[11px] text-muted">{diff >= 0 ? "SIP leads" : "Deposit leads"}</p>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted">
          SIP returns are not guaranteed and can fall as well as rise. Bank deposit rates are fixed. This is an illustration, not advice.
        </p>
      </div>
    </div>
  );
}
