"use client";
import { useState } from "react";
import { sip, emi, fd, bal, inr, TAX_YEAR_LABEL, DEFAULT_SIP_RETURN } from "@/lib/finance";
import SliderInput from "./SliderInput";

export { TAX_YEAR_LABEL, DEFAULT_SIP_RETURN };

type Unit = "₹" | "yrs" | "%";
type Field = { id: string; label: string; min: number; max: number; step: number; start: number; unit: Unit; helperNote?: string };
type Out = { title: string; big: string; rows: [string, string][]; a: number; b: number; na: string; nb: string; s: number[]; st: string };
type Moment = {
  tag: string;
  cardTag: string;
  chip: string;
  plainDesc: string;
  fields: Field[];
  calc: (v: number[]) => Out;
};

const moments: Moment[] = [
  {
    tag: "Monthly investing",
    cardTag: "Monthly investing (SIP)",
    chip: "Just got my first salary",
    plainDesc: "You invest a fixed amount every month to build wealth over time.",
    fields: [
      { id: "hero-sip-amount", label: "Monthly SIP", min: 500, max: 100000, step: 500, start: 5000, unit: "₹" },
      { id: "hero-sip-years", label: "For how long", min: 1, max: 30, step: 1, start: 10, unit: "yrs" },
      {
        id: "hero-sip-return",
        label: "Expected return",
        min: 6,
        max: 15,
        step: 0.5,
        start: DEFAULT_SIP_RETURN,
        unit: "%",
        helperNote: "An assumption, not a promise. Real returns vary year to year.",
      },
    ],
    calc: ([m, y, r]) => {
      const fv = sip(m, r, y),
        put = m * y * 12;
      return {
        title: "Your SIP could grow to",
        big: inr(fv),
        rows: [
          ["You put in", inr(put)],
          ["Estimated gain", inr(fv - put)],
        ],
        a: put,
        b: fv - put,
        na: "Invested",
        nb: "Gain",
        st: "Value each year",
        s: Array.from({ length: y + 1 }, (_, t) => sip(m, r, t)),
      };
    },
  },
  {
    tag: "Loan payment",
    cardTag: "Loan payment (EMI)",
    chip: "Planning a big purchase",
    plainDesc: "You borrow a fixed amount and repay it in equal monthly instalments.",
    fields: [
      { id: "hero-emi-loan", label: "Loan amount", min: 100000, max: 20000000, step: 50000, start: 3000000, unit: "₹" },
      { id: "hero-emi-term", label: "Loan term", min: 1, max: 30, step: 1, start: 20, unit: "yrs" },
      { id: "hero-emi-rate", label: "Interest rate", min: 6, max: 15, step: 0.25, start: 8.5, unit: "%" },
    ],
    calc: ([p, y, r]) => {
      const m = emi(p, r, y * 12),
        t = m * y * 12;
      return {
        title: "Your monthly EMI would be",
        big: inr(m),
        rows: [
          ["Total you repay", inr(t)],
          ["Of which interest", inr(t - p)],
        ],
        a: p,
        b: t - p,
        na: "Principal",
        nb: "Interest",
        st: "Balance still owed each year",
        s: Array.from({ length: y + 1 }, (_, t) => bal(p, r, y, t)),
      };
    },
  },
  {
    tag: "Fixed deposit",
    cardTag: "Fixed deposit (FD)",
    chip: "Growing my savings safely",
    plainDesc: "You deposit a lump sum with a bank and it earns fixed interest.",
    fields: [
      { id: "hero-fd-amount", label: "Amount to deposit", min: 10000, max: 5000000, step: 10000, start: 200000, unit: "₹" },
      { id: "hero-fd-term", label: "For how long", min: 1, max: 10, step: 1, start: 5, unit: "yrs" },
      { id: "hero-fd-rate", label: "FD interest rate", min: 4, max: 9, step: 0.25, start: 7, unit: "%" },
    ],
    calc: ([p, y, r]) => {
      const mat = fd(p, r, y);
      return {
        title: "Your FD would mature at",
        big: inr(mat),
        rows: [
          ["You deposit", inr(p)],
          ["Interest earned", inr(mat - p)],
        ],
        a: p,
        b: mat - p,
        na: "Deposit",
        nb: "Interest",
        st: "Value each year",
        s: Array.from({ length: y + 1 }, (_, t) => fd(p, r, t)),
      };
    },
  },
];

function Chart({ s, label }: { s: number[]; label: string }) {
  const W = 300,
    H = 90,
    max = Math.max(...s, 1);
  const line = s
    .map((v, i) => `${i ? "L" : "M"}${((i / (s.length - 1)) * W).toFixed(1)} ${(H - (v / max) * (H - 6) - 3).toFixed(1)}`)
    .join(" ");
  return (
    <figure className="mt-5">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-24 w-full" role="img" aria-label={label}>
        <path d={`${line} L${W} ${H} L0 ${H}Z`} className="fill-primary/15" />
        <path d={line} className="fill-none stroke-primary" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <figcaption className="mt-1 flex justify-between text-xs text-muted">
        <span>Today</span>
        <span>{label}</span>
      </figcaption>
    </figure>
  );
}

export default function Calculator({ intro }: { intro?: React.ReactNode }) {
  const [i, setI] = useState(0);
  const [v, setV] = useState(moments[0].fields.map((f) => f.start));
  const m = moments[i],
    out = m.calc(v),
    pct = out.a + out.b > 0 ? (out.a / (out.a + out.b)) * 100 : 50;
  const pick = (k: number) => {
    setI(k);
    setV(moments[k].fields.map((f) => f.start));
  };

  const updateVal = (index: number, val: number) => {
    setV((prev) => prev.map((x, j) => (j === index ? val : x)));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col">
        {intro}
        <p className="mb-3 mt-8 text-sm font-medium text-muted">Choose a moment</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-label="Choose a money moment">
          {moments.map((k, n) => (
            <button
              key={k.tag}
              onClick={() => pick(n)}
              aria-pressed={n === i}
              className={`min-h-[44px] rounded-md border p-4 text-left transition ${
                n === i ? "border-ink bg-ink text-white" : "border-line bg-surface hover:border-ink"
              } ${n === moments.length - 1 && moments.length % 2 ? "sm:col-span-2" : ""}`}
            >
              <span className={`block text-xs font-semibold ${n === i ? "text-white/80" : "text-muted"}`}>
                {k.tag}
              </span>
              <span className="mt-1 block text-base font-medium">{k.chip}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-[10px] border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-24" aria-live="polite">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            {m.cardTag}
          </span>
          <span className="text-xs text-muted">Updates as you type</span>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-ink">{out.title}</p>
          <p className="mt-0.5 text-xs text-muted">{m.plainDesc}</p>
          <p className="mt-2 font-serif text-5xl tabular-nums">{out.big}</p>
        </div>
        <div className="mt-5 flex h-2 overflow-hidden rounded-sm bg-line" aria-hidden>
          <div className="bg-primary transition-all duration-150" style={{ width: `${pct}%` }} />
          <div className="flex-1 bg-accent" />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted">
          <span>{out.na}</span>
          <span>{out.nb}</span>
        </div>
        <Chart s={out.s} label={out.st} />
        <dl className="mt-5 space-y-1 text-sm">
          {out.rows.map(([k, x]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-muted">{k}</dt>
              <dd className="tabular-nums font-medium">{x}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 space-y-5 border-t-[1.5px] border-line pt-6">
          {m.fields.map((f, n) => (
            <SliderInput
              key={f.id}
              id={f.id}
              label={f.label}
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[n]}
              unit={f.unit}
              helperNote={f.helperNote}
              onChange={(val) => updateVal(n, val)}
            />
          ))}
        </div>
        <p className="mt-5 text-xs text-muted">
          {m.tag === "Fixed deposit"
            ? "Fixed interest, compounded quarterly. Illustrative estimate, not advice or a guarantee."
            : "Illustrative estimate, not advice or a guarantee."}
        </p>
      </div>
    </div>
  );
}
