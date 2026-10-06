"use client";
import { useEffect, useState } from "react";

const links = [["Calculators", "calculators"], ["Compare", "compare"], ["How it works", "how-it-works"], ["Example", "example"], ["Trust", "trust"], ["FAQ", "faq"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    links.forEach(([, id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { io.disconnect(); window.removeEventListener("keydown", esc); };
  }, []);
  return (
    <header className="sticky top-0 z-10 border-b-[1.5px] border-line bg-paper/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <a href="#top" className="font-serif text-2xl">Fermor</a>
        <ul className="hidden gap-7 text-sm md:flex">
          {links.map(([l, id]) => (<li key={id}><a href={`#${id}`} className={active === id ? "border-b-2 border-accent pb-1 text-ink" : "text-muted hover:text-ink"}>{l}</a></li>))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#waitlist" className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/85">Join waitlist</a>
          <button className="rounded-md border border-line px-3 py-2 text-sm md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
        </div>
      </nav>
      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-paper px-5 py-2 md:hidden">
          {links.map(([l, id]) => (<li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block border-b border-line py-3 last:border-0">{l}</a></li>))}
        </ul>
      )}
    </header>
  );
}
