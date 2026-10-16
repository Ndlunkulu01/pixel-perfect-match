import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartHandshake, ShieldCheck, Smartphone } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About OpportunityConnect" },
      { name: "description", content: "Why OpportunityConnect exists: helping South African youth find opportunities and avoid job scams." },
      { property: "og:title", content: "About OpportunityConnect" },
      { property: "og:description", content: "A community tool for safer job searching in South Africa." },
    ],
  }),
  component: About,
});

function About() {
  const items = [
    { icon: HeartHandshake, t: "Community first", d: "Built to help young and unemployed South Africans discover entry-level jobs, internships, learnerships and remote work in one place." },
    { icon: ShieldCheck, t: "Safety by design", d: "Every page reminds you to verify employers. We never claim a listing is verified, and we never ask for money." },
    { icon: Smartphone, t: "Made for your phone", d: "Light, fast and easy to use on Android phones with limited data — no account or subscription needed." },
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">About OpportunityConnect</h1>
      <p className="mt-3 text-lg text-muted-foreground">Youth unemployment in South Africa is among the highest in the world, and fake job adverts make the search even harder. OpportunityConnect brings opportunities together and teaches job seekers how to stay safe.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.t} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <i.icon className="h-7 w-7 text-accent" />
            <h2 className="mt-3 text-lg font-bold">{i.t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-warning bg-warning-soft p-5 text-sm">
        <strong>About the listings:</strong> This is a prototype. All opportunities shown are demonstration data using fictional organisations — they are not real or verified vacancies. Always verify employers independently before sharing personal information or paying any fees.
      </div>
      <Link to="/safety" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground">Visit the Safety Centre</Link>
    </div>
  );
}
