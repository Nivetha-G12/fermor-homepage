# Fermor homepage

A single-page homepage for Fermor, built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Run it
```
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Decisions
- **Organised by life moment, not product feature.** The hero asks what is on your mind and each answer opens the right calculator (SIP, EMI, FD), so a first-time visitor learns what Fermor does by using it.
- **Compare section:** Helps a first-time investor compare a monthly market investment (SIP) against a fixed-rate bank deposit with their own numbers, visualising the divergence over time.
- **Conservative 11% default SIP return:** Grounded in realistic long-term Indian equity fund expectations, explicitly labelled as an assumption and not a promise since year-to-year returns fluctuate.
- **Pure browser maths:** Pure calculations in `src/lib/finance.ts` with Indian digit grouping (lakh/crore) and dual-sync typed inputs alongside range sliders.
- **Palette and type:** cool mist background, navy ink, teal for positive values and one vermilion accent; Instrument Serif for headlines and numbers, DM Sans for everything else.
- **Honest by default & Demo waitlist:** Every projection is labelled illustrative and Fermor is stated to be educational, not a SEBI-registered adviser. The waitlist is a front-end demonstration form that stores and transmits no emails.

## Limitations & Not built yet
- The deposit comparison is a simplified monthly-compounding illustration.
- Tax calculator is not built yet.
- The waitlist is a front-end demo and stores nothing.

## Screenshots
- Desktop view: `docs/desktop.png`
- Mobile view: `docs/mobile.png`
