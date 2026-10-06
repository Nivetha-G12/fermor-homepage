import Calculator from "@/components/Calculator";
import Compare from "@/components/Compare";
import Waitlist from "@/components/Waitlist";
import Navbar from "@/components/Navbar";
import { sip, inr, DEFAULT_SIP_RETURN } from "@/lib/finance";

const principles = [
  ["Show the math", "Every result sits next to what you put in and what it earns, so you can see where the number comes from."],
  ["Plain words, no jargon", "We say \"monthly payment\" before we say \"EMI\", and explain each term the first time it appears."],
  ["You stay in control", "Nothing to sign up for. Move a slider, read the result, close the tab."],
];

const trustItems = [
  ["What stays on your device.", "The numbers you type are used for the calculation in your browser and are not sent to any server."],
  ["What we ask for.", "Nothing to calculate. An email only if you join the waitlist."],
  ["What the waitlist does today.", "It is a demo form and does not store emails yet."],
  ["What this is not.", "Fermor is educational and not a SEBI-registered adviser. Results are illustrations based on the rates you choose."],
];

const faqs = [
  ["What does Fermor do?", "Fermor turns money decisions into clear numbers. Today that means free calculators; an app to track and plan is coming."],
  ["Are the calculators free?", "Yes. There is no sign-up and no paywall."],
  ["Is my data stored?", "No. The calculations run in your browser and the numbers you enter are not sent anywhere."],
  ["Is this financial advice?", "No. Fermor is educational and is not a SEBI-registered adviser. Talk to a registered adviser before investing."],
  ["How accurate are the projections?", "The arithmetic is exact for the inputs you choose. Real returns vary, so treat results as illustrations, not promises."],
];

const years = [5, 10, 20];
const wrap = "mx-auto max-w-6xl px-5";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <section id="calculators" className={`${wrap} scroll-mt-20 py-14 sm:py-20`}>
          <Calculator intro={<>
            <p className="text-sm font-medium text-muted">Free calculators for first-time investors in India</p>
            <h1 className="mt-3 font-serif text-5xl leading-[1.05] text-balance sm:text-6xl">What&apos;s on your mind with money?</h1>
            <p className="mt-5 max-w-xl text-lg text-muted text-balance">Pick where you are and see the math in plain numbers. No sign&#8209;up. The Fermor app, for tracking and planning your money, is coming soon.</p>
            <a href="#waitlist" className="mt-6 inline-block rounded-md border-[1.5px] border-ink px-5 py-2.5 font-medium hover:bg-ink hover:text-white">Join the waitlist</a>
          </>} />
        </section>

        <section id="compare" className="scroll-mt-20 border-t-[1.5px] border-line py-16">
          <div className={wrap}>
            <h2 className="font-serif text-4xl">SIP or fixed deposit? Try the same monthly amount.</h2>
            <p className="mt-3 max-w-xl text-muted">See what the same monthly savings become in an equity fund versus a fixed-rate deposit over time.</p>
            <div className="mt-8">
              <Compare />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 border-t-[1.5px] border-line py-16">
          <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_2fr]`}>
            <h2 className="font-serif text-4xl">How Fermor thinks</h2>
            <div className="divide-y divide-line">
              {principles.map(([t, d]) => (<div key={t} className="py-5 first:pt-0"><h3 className="text-lg font-medium">{t}</h3><p className="mt-1 max-w-lg text-muted">{d}</p></div>))}
            </div>
          </div>
        </section>

        <section id="example" className="scroll-mt-20 border-t-[1.5px] border-line py-16">
          <div className={wrap}>
            <h2 className="font-serif text-4xl">Priya&apos;s first ₹5,000 SIP</h2>
            <p className="mt-3 max-w-xl text-muted">Priya is 24 and just started work. She puts ₹5,000 a month into an index fund assumed to return {DEFAULT_SIP_RETURN}% a year. Here is what the same habit becomes over time.</p>
            <div className="mt-8 overflow-x-auto rounded-[10px] border border-line bg-surface">
              <table className="w-full text-left text-sm tabular-nums">
                <thead className="border-b border-line text-muted">
                  <tr>
                    <th className="p-4 font-medium">After</th>
                    <th className="hidden p-4 font-medium sm:table-cell">She put in</th>
                    <th className="p-4 font-medium">Estimated gain</th>
                    <th className="p-4 text-right font-medium">Worth about</th>
                  </tr>
                </thead>
                <tbody>
                  {years.map((y) => {
                    const fv = sip(5000, DEFAULT_SIP_RETURN, y),
                      put = 5000 * y * 12;
                    return (
                      <tr key={y} className="border-b border-line last:border-0">
                        <td className="p-4">{y} years</td>
                        <td className="hidden p-4 sm:table-cell">{inr(put)}</td>
                        <td className="p-4 text-primary">{inr(fv - put)}</td>
                        <td className="p-4 text-right font-bold text-ink">{inr(fv)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted">Illustration only. Returns are not guaranteed.</p>
          </div>
        </section>

        <section id="trust" className="scroll-mt-20 border-t-[1.5px] border-line py-16">
          <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_2fr]`}>
            <h2 className="font-serif text-4xl">Built to be checked, not trusted blindly</h2>
            <div className="divide-y divide-line border-y border-line">
              {trustItems.map(([lead, text]) => (
                <div key={lead} className="py-4">
                  <p className="text-sm sm:text-base leading-relaxed text-muted">
                    <strong className="font-semibold text-ink">{lead}</strong> {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="scroll-mt-20 border-t-[1.5px] border-line bg-surface py-16">
          <div className={`${wrap} grid gap-8 lg:grid-cols-2 lg:items-center`}>
            <div><h2 className="font-serif text-4xl">Get the app when it opens</h2><p className="mt-3 max-w-md text-muted">No spam. We will only email you about the app launch.</p></div>
            <Waitlist />
          </div>
        </section>

        <section id="faq" className={`${wrap} scroll-mt-20 py-16`}>
          <h2 className="font-serif text-4xl">Questions &amp; answers</h2>
          <div className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
            {faqs.map(([q, a]) => (<details key={q} className="group py-4"><summary className="cursor-pointer list-none font-medium after:float-right after:text-muted after:content-['+'] group-open:after:content-['–']">{q}</summary><p className="mt-2 text-muted">{a}</p></details>))}
          </div>
        </section>
      </main>
      <footer className="border-t-[1.5px] border-line py-8">
        <div className={`${wrap} flex flex-col gap-4 text-sm text-muted sm:flex-row sm:justify-between`}>
          <div><span className="font-serif text-xl text-ink">Fermor</span><div className="mt-2 flex flex-wrap gap-4"><a href="#calculators" className="hover:text-ink">Calculators</a><a href="#compare" className="hover:text-ink">Compare</a><a href="#how-it-works" className="hover:text-ink">How it works</a><a href="#example" className="hover:text-ink">Example</a><a href="#trust" className="hover:text-ink">Trust</a><a href="#faq" className="hover:text-ink">FAQ</a><a href="#waitlist" className="hover:text-ink">Waitlist</a></div></div>
          <p className="max-w-md">Fermor is educational and not a SEBI-registered adviser. Results are illustrative.</p>
        </div>
      </footer>
    </>
  );
}
