export const TAX_YEAR_LABEL = "New regime (verify current rules before filing)";
export const DEFAULT_SIP_RETURN = 11;

export const sip = (p: number, rate: number, years: number) => {
  const i = rate / 1200, n = years * 12;
  return i ? p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i) : p * n;
};
export const emi = (p: number, rate: number, months: number) => {
  const i = rate / 1200;
  if (!i) return p / months;
  const f = Math.pow(1 + i, months);
  return (p * i * f) / (f - 1);
};
// Quarterly compounding, the usual convention for Indian bank FDs
export const fd = (p: number, rate: number, years: number) => p * Math.pow(1 + rate / 400, 4 * years);
export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
// Loan balance still owed after t years, for a loan of p over `term` years
export const bal = (p: number, rate: number, term: number, t: number) => {
  const i = rate / 1200, k = t * 12, m = emi(p, rate, term * 12);
  return Math.max(0, i ? p * Math.pow(1 + i, k) - m * ((Math.pow(1 + i, k) - 1) / i) : p - m * k);
};
