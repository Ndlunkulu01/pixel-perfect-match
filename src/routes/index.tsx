import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Search, ShieldAlert } from "lucide-react";
import { OPPORTUNITIES, TYPES } from "@/lib/opportunities";
import { OpportunityCard } from "@/components/site";
import { useSaved } from "@/lib/saved";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OpportunityConnect — Find jobs, internships & learnerships safely" },
      { name: "description", content: "Discover entry-level jobs, internships, learnerships and remote work in South Africa — and learn to spot job scams." },
      { property: "og:title", content: "OpportunityConnect — Safe job search for South African youth" },
      { property: "og:description", content: "Browse opportunities and learn the warning signs of fake job adverts." },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const { saved } = useSaved();
  const featured = OPPORTUNITIES.filter((o) => o.featured);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim().length < 2) {
      toast.error("Type at least 2 characters to search");
      return;
    }
    nav({ to: "/opportunities", search: { q: q.trim() } });
  };

  return (
    <div>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Sawubona · Welcome</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl">Your next opportunity, found safely.</h1>
          <p className="mt-4 max-w-xl text-primary-foreground/80">Entry-level jobs, internships, learnerships and remote work for South African job seekers — with tips to avoid scams.</p>
          <form onSubmit={submit} className="mt-8 flex max-w-xl gap-2 rounded-xl bg-card p-2">
            <label htmlFor="hs" className="sr-only">Search opportunities</label>
            <input id="hs" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. data capturer, Gauteng"
              className="min-w-0 flex-1 bg-transparent px-3 text-foreground outline-none placeholder:text-muted-foreground" />
            <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-3 font-semibold text-accent-foreground"><Search className="h-4 w-4" />Search</button>
          </form>
        </div>
      </section>

      <section className="mx-auto -mt-8 grid max-w-6xl grid-cols-2 gap-3 px-4 md:grid-cols-4">
        {[
          { n: OPPORTUNITIES.length, l: "Demo listings" },
          ...TYPES.slice(1, 3).map((t) => ({ n: OPPORTUNITIES.filter((o) => o.type === t).length, l: `${t}s` })),
          { n: saved.length, l: "Saved by you" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="font-display text-3xl font-extrabold text-primary">{s.n}</div>
            <div className="text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <Link to="/safety" className="flex items-start gap-3 rounded-xl border border-warning bg-warning-soft p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p className="text-sm"><strong>Never pay to get a job.</strong> All listings here are demonstration data, not verified vacancies. Learn how to spot a scam in our Safety Centre →</p>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured opportunities</h2>
          <Link to="/opportunities" className="flex items-center gap-1 text-sm font-semibold text-accent">See all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((o) => <OpportunityCard key={o.id} opp={o} />)}
        </div>
      </section>
    </div>
  );
}
