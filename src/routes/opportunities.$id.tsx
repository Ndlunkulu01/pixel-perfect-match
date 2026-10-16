import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, ExternalLink, MapPin, ShieldAlert, Wallet } from "lucide-react";
import { getOpportunity } from "@/lib/opportunities";
import { DemoBadge, SaveButton } from "@/components/site";

export const Route = createFileRoute("/opportunities/$id")({
  loader: ({ params }) => {
    const opp = getOpportunity(params.id);
    if (!opp) throw notFound();
    return opp;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — OpportunityConnect` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} (demo listing)` },
          { property: "og:description", content: loaderData.summary },
        ]
      : [{ title: "Opportunity not found — OpportunityConnect" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Opportunity not found</h1>
      <p className="mt-2 text-muted-foreground">It may have closed or been removed.</p>
      <Link to="/opportunities" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground">Browse opportunities</Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const o = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/opportunities" className="inline-flex items-center gap-1 text-sm font-semibold text-accent"><ArrowLeft className="h-4 w-4" />Back to board</Link>
      <div className="mt-4 rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-wrap gap-2"><span className="rounded-full bg-teal-soft px-2.5 py-1 text-xs font-bold text-primary">{o.type}</span><DemoBadge /></div>
        <h1 className="mt-3 text-2xl font-extrabold md:text-3xl">{o.title}</h1>
        <p className="text-muted-foreground">{o.organisation}</p>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" />{o.location} · {o.arrangement}</span>
          <span className="flex items-center gap-2"><Wallet className="h-4 w-4 text-accent" />{o.stipend}</span>
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" />Closes {o.closing}</span>
        </div>
        <h2 className="mt-6 text-lg font-bold">About the role</h2>
        <p className="mt-1 text-muted-foreground">{o.summary}</p>
        <h2 className="mt-6 text-lg font-bold">Requirements</h2>
        <ul className="mt-1 list-disc pl-5 text-muted-foreground">{o.requirements.map((r) => <li key={r}>{r}</li>)}</ul>

        <div className="mt-6 flex gap-3 rounded-lg border border-warning bg-warning-soft p-4 text-sm">
          <ShieldAlert className="h-5 w-5 shrink-0 text-destructive" />
          <p>This is a <strong>demonstration listing</strong> and the organisation has <strong>not been verified</strong>. Before applying anywhere, confirm the employer exists, and never pay any fee or share your ID or bank details with unverified contacts.</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={o.applyUrl} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:bg-primary/90">Apply now <ExternalLink className="h-4 w-4" /></a>
          <SaveButton opp={o} large />
        </div>
      </div>
    </div>
  );
}
