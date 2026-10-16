import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Banknote, Building2, CheckCircle2, Mail, Phone, Timer } from "lucide-react";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety Centre — Spot fake job adverts | OpportunityConnect" },
      { name: "description", content: "Learn the warning signs of job scams: upfront fees, suspicious contact details and unverifiable employers." },
      { property: "og:title", content: "Safety Centre — Spot fake job adverts" },
      { property: "og:description", content: "Warning signs and a quick checklist before you apply." },
    ],
  }),
  component: Safety,
});

const SIGNS = [
  { icon: Banknote, title: "Requests for upfront fees", text: "Real employers never charge for applications, training, uniforms, medicals or \"placement\". Any request to pay is a red flag." },
  { icon: Mail, title: "Suspicious contact details", text: "Free email addresses (Gmail, Yahoo) for big companies, WhatsApp-only contact, or numbers that never answer." },
  { icon: Building2, title: "Unverifiable employer", text: "No website, physical address or registration you can find. Check the company on CIPC or call its official switchboard." },
  { icon: Timer, title: "Pressure to act fast", text: "\"Only 2 spots left, pay today\" — scammers rush you so you don't check." },
  { icon: Phone, title: "Asking for sensitive info early", text: "Requests for your ID copy, bank PIN or OTP before an interview. Never share OTPs or PINs with anyone." },
  { icon: AlertTriangle, title: "Too good to be true", text: "Very high pay for no experience, or a job offer without any interview." },
];

const CHECKS = [
  "I found the employer's official website or office address",
  "The contact email uses the company's own domain",
  "I have not been asked to pay any money",
  "I was not asked for my bank PIN, OTP or passwords",
  "The advert also appears on the company's own channels",
];

function Safety() {
  const [done, setDone] = useState<boolean[]>(CHECKS.map(() => false));
  const all = done.every(Boolean);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Safety Centre</h1>
      <p className="mt-1 max-w-2xl text-muted-foreground">Fake job adverts target people who need work the most. Learn the warning signs so you can apply with confidence.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SIGNS.map((s) => (
          <div key={s.title} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <s.icon className="h-7 w-7 text-destructive" />
            <h2 className="mt-3 text-lg font-bold">{s.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-xl font-bold">Before you apply: quick checklist</h2>
        <ul className="mt-4 space-y-3">
          {CHECKS.map((c, i) => (
            <li key={c}>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={done[i]} onChange={() => setDone(done.map((d, j) => (j === i ? !d : d)))} className="mt-1 h-5 w-5 accent-[var(--accent)]" />
                <span>{c}</span>
              </label>
            </li>
          ))}
        </ul>
        <button onClick={() => all ? toast.success("Good work — you've checked the basics. Stay alert during the process.") : toast.warning(`${done.filter((d) => !d).length} item(s) still unchecked. Don't share personal info until you're sure.`)}
          className="mt-5 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground"><CheckCircle2 className="h-4 w-4" />Check my answers</button>
      </section>

      <section className="mt-6 rounded-xl border border-warning bg-warning-soft p-5 text-sm">
        <strong>Been targeted by a scam?</strong> Report it to the South African Police Service (SAPS) Crime Stop on 08600 10111, and warn friends and family.
      </section>
    </div>
  );
}
