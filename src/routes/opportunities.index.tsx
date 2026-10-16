import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { ARRANGEMENTS, CATEGORIES, LOCATIONS, OPPORTUNITIES, TYPES } from "@/lib/opportunities";
import { EmptyState, OpportunityCard } from "@/components/site";

type S = { q?: string; category?: string; location?: string; arrangement?: string; type?: string };

export const Route = createFileRoute("/opportunities/")({
  validateSearch: (s: Record<string, unknown>): S => {
    const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
    return { q: str(s.q), category: str(s.category), location: str(s.location), arrangement: str(s.arrangement), type: str(s.type) };
  },
  head: () => ({
    meta: [
      { title: "Browse opportunities — OpportunityConnect" },
      { name: "description", content: "Search jobs, internships, learnerships and remote work by category, location and work arrangement." },
      { property: "og:title", content: "Browse opportunities — OpportunityConnect" },
      { property: "og:description", content: "Filter entry-level opportunities across South Africa." },
    ],
  }),
  component: Board,
});

function Board() {
  const s = Route.useSearch();
  const nav = useNavigate({ from: "/opportunities/" });
  const set = (k: keyof S, v: string) => nav({ search: (p: S) => ({ ...p, [k]: v || undefined }), replace: true });
  const q = (s.q ?? "").toLowerCase();
  const results = OPPORTUNITIES.filter((o) =>
    (!q || [o.title, o.organisation, o.location, o.category, o.summary].join(" ").toLowerCase().includes(q)) &&
    (!s.category || o.category === s.category) &&
    (!s.location || o.location === s.location) &&
    (!s.arrangement || o.arrangement === s.arrangement) &&
    (!s.type || o.type === s.type));
  const active = Object.values(s).some(Boolean);

  const sel = "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm";
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Opportunity board</h1>
      <p className="mt-1 text-muted-foreground">All listings are demonstration data — not verified vacancies.</p>

      <div className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 shadow-card md:grid-cols-5">
        <input aria-label="Search" value={s.q ?? ""} onChange={(e) => set("q", e.target.value)} placeholder="Search title, company…" className={`${sel} md:col-span-5`} />
        <select aria-label="Category" value={s.category ?? ""} onChange={(e) => set("category", e.target.value)} className={sel}>
          <option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select aria-label="Location" value={s.location ?? ""} onChange={(e) => set("location", e.target.value)} className={sel}>
          <option value="">All locations</option>{LOCATIONS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select aria-label="Work arrangement" value={s.arrangement ?? ""} onChange={(e) => set("arrangement", e.target.value)} className={sel}>
          <option value="">Any arrangement</option>{ARRANGEMENTS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select aria-label="Opportunity type" value={s.type ?? ""} onChange={(e) => set("type", e.target.value)} className={sel}>
          <option value="">All types</option>{TYPES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button disabled={!active} onClick={() => nav({ search: {}, replace: true })} className="rounded-lg border border-border px-3 py-2.5 text-sm font-semibold text-primary disabled:opacity-40">Clear filters</button>
      </div>

      <p className="mt-5 text-sm font-semibold text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "opportunity" : "opportunities"} found</p>
      {results.length ? (
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map((o) => <OpportunityCard key={o.id} opp={o} />)}</div>
      ) : (
        <div className="mt-3"><EmptyState icon={SearchX} title="No matches yet" text="Try a different keyword or remove a filter — new opportunities appear often.">
          <button onClick={() => nav({ search: {}, replace: true })} className="rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground">Clear all filters</button>
        </EmptyState></div>
      )}
    </div>
  );
}
