"use client";
import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "done" : "error");
  };
  if (state === "done")
    return (
      <div className="rounded-md border border-primary bg-surface p-4 text-primary" role="status">
        <p className="font-medium">Thanks for your interest.</p>
        <p className="mt-1 text-sm text-muted">
          This is a demo form, so <span className="font-mono text-ink">{email}</span> was not saved or sent anywhere.
        </p>
      </div>
    );
  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" noValidate>
        <div className="flex-1">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? "email-err" : undefined}
            className="w-full rounded-md border border-line bg-surface px-4 py-3"
          />
          {state === "error" && (
            <p id="email-err" className="mt-1 text-sm text-accent">
              Enter a valid email, like name@example.com.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-ink px-6 py-3 font-medium text-white hover:bg-ink/85"
        >
          Join the waitlist
        </button>
      </form>
      <p className="mt-3 text-xs text-muted">Demo form: emails are not stored yet.</p>
    </div>
  );
}
