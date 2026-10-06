# Fermor Homepage

**Live demo:** https://fermor-homepage-tau.vercel.app

A single-page homepage for Fermor, a finance platform for people in India, built as a frontend assignment. Most people don't start with "I need a SIP calculator." They start with "I just got my first salary" or "I want to buy something big." So the hero asks what's on your mind, and each answer opens the right calculator.

![Desktop view](docs/desktop.png)
![Mobile view](docs/mobile.png)

## What's on the page

- **Hero with three money moments:** monthly investing (SIP), a loan payment (EMI), and a fixed deposit (FD). Each opens a live calculator with sliders, typed inputs and a chart.
- **Compare section:** the same monthly amount in a SIP versus a fixed-rate bank deposit, shown as two lines over time. The chart readout works with mouse, touch and arrow keys.
- **Principles, a worked example, a trust section, a waitlist demo, an FAQ and a footer.** The worked example follows a first-time investor, Priya.
- **Mobile menu, section links and an active-section highlight in the nav.**

## Run it locally

Requires Node 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Tech stack

Next.js (App Router), React, TypeScript and Tailwind CSS v4, deployed on Vercel. I used no UI library and no chart library: both charts are hand-written SVG. All the maths runs in the browser, so there is no backend.

## How the maths works

All calculations are pure functions in `src/lib/finance.ts`. Amounts are shown with Indian digit grouping (lakh and crore).

- **SIP:** future value of monthly investments, `FV = P × [((1+i)^n − 1) / i] × (1+i)`, with `i` = annual return ÷ 12 ÷ 100 and `n` = months.
- **EMI:** standard loan formula, `EMI = P × i × (1+i)^n / ((1+i)^n − 1)`.
- **Fixed deposit:** quarterly compounding, the usual convention for Indian bank deposits.
- **Deposit in the Compare section:** a simplified illustration that uses the same monthly formula at a fixed rate.

## Decisions I made

- **Life moments, not product features.** A first-time visitor learns what Fermor does by using it, not by reading about it.
- **A compare section.** "SIP or a fixed deposit?" is a question a new investor actually has, so they can try both with their own numbers.
- **An 11% default SIP return, clearly labelled as an assumption.** I chose a moderate figure rather than the most flattering one. The page says real returns vary year to year.
- **Plain language first.** Technical terms such as SIP, EMI and FD are explained where they first appear.
- **Palette and type.** A cool mist background, navy text, teal for positive values and one vermilion accent. Instrument Serif for headlines and numbers, DM Sans for everything else.
- **Honest copy.** Every projection is labelled illustrative, and the page says Fermor is educational and not a SEBI-registered adviser.
- **A demo waitlist.** It validates the email but stores nothing, and the page says so.

## How I checked it

- [Tested the formulas by hand, for example ₹5,000 a month for 10 years at 11% gives ₹10,94,936.]
- [Tried invalid, out-of-range and comma-formatted values in the typed inputs.]
- [Checked the layout on desktop and phone widths, including the mobile menu.]
- [Ran `npm run build` with no errors.]

## Limitations

- The deposit comparison is a simplified monthly-compounding illustration, not an exact FD or RD calculation.
- There is no tax calculator. Slabs change by year, and I didn't want to publish numbers I couldn't verify.
- The waitlist is a front-end demo. It sends and stores nothing.
- Returns are user-set assumptions. Nothing on the page is investment advice.

## What I'd do next

- Add a tax calculator once the current slabs are verified against the official source.
- Store waitlist signups for real, with a proper privacy notice.
- Add automated tests for the finance functions.
- Add more money moments, such as saving for a goal.

## Author

[Your name] · [GitHub profile or email]
