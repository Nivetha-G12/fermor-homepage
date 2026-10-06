"use client";
import { useState, useEffect } from "react";

interface SliderInputProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit: "₹" | "yrs" | "%";
  helperNote?: string;
  onChange: (val: number) => void;
}

export default function SliderInput({
  id,
  label,
  min,
  max,
  step,
  value,
  unit,
  helperNote,
  onChange,
}: SliderInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [typedText, setTypedText] = useState("");

  const formatDisplay = (n: number) => {
    if (unit === "₹") {
      return Math.round(n).toLocaleString("en-IN");
    }
    if (unit === "%") {
      return Number(n.toFixed(2)).toString();
    }
    return n.toString();
  };

  useEffect(() => {
    if (!isFocused) {
      setTypedText(formatDisplay(value));
    }
  }, [value, isFocused, unit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setTypedText(raw);

    // Live sync if valid number in range
    const clean = raw.replace(/,/g, "").trim();
    if (clean !== "" && !isNaN(Number(clean))) {
      const num = Number(clean);
      if (num >= min && num <= max) {
        onChange(num);
      }
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const clean = typedText.replace(/,/g, "").trim();
    let num = Number(clean);
    if (clean === "" || isNaN(num)) {
      num = value;
    } else {
      num = Math.min(Math.max(num, min), max);
      if (step < 1) {
        const factor = Math.round(1 / step);
        num = Math.round(num * factor) / factor;
      } else {
        num = Math.round(num / step) * step;
      }
      num = Math.min(Math.max(num, min), max);
    }
    onChange(num);
    setTypedText(formatDisplay(num));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="block">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-ink cursor-pointer select-none">
          {label}
        </label>
        <div className="flex min-h-[44px] items-center rounded-md border border-line bg-surface px-3 py-2 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          {unit === "₹" && <span className="mr-1 text-base font-medium text-muted sm:text-sm">₹</span>}
          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={isFocused ? typedText : formatDisplay(value)}
            onFocus={() => {
              setIsFocused(true);
              setTypedText(unit === "₹" ? Math.round(value).toString() : value.toString());
            }}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-24 text-right text-base font-medium tabular-nums text-ink outline-none bg-transparent sm:text-sm"
            aria-label={`${label} input value`}
          />
          {unit !== "₹" && <span className="ml-1 text-xs font-medium text-muted">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={max}
        step={step}
        value={value}
        style={{
          background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${pct}%, var(--color-line) ${pct}%, var(--color-line) 100%)`,
        }}
        className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-sm accent-primary"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {helperNote && <p className="mt-1.5 text-xs text-muted">{helperNote}</p>}
    </div>
  );
}
