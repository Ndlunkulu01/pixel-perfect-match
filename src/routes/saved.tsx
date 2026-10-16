import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { OPPORTUNITIES } from "@/lib/opportunities";
import { useSaved } from "@/lib/saved";
import { EmptyState, OpportunityCard } from "@/components/site";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved opportunities — OpportunityConnect" },
      { name: "description", content: "Opportunities you've saved on this device." },
      { property: "og:title", content: "Saved opportunities — OpportunityConnect" },
      { property: "og:description", content: "Keep track of opportunities you want to apply for." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const { saved } = useSaved();
  const list = OPPORTUNITIES.filter((o) => saved.includes(o.id));
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Saved opportunities</h1>
      <p className="mt-1 text-muted-foreground">Saved on this device only — nothing is sent anywhere.</p>
      <div className="mt-6">
        {list.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((o) => <OpportunityCard key={o.id} opp={o} />)}</div>
        ) : (
          <EmptyState icon={Bookmark} title="Nothing saved yet" text="Tap the bookmark on any opportunity to keep it here for later.">
            <Link to="/opportunities" className="rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground">Browse opportunities</Link>
          </EmptyState>
        )}
      </div>
    </div>
  );
}
