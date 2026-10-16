import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, Briefcase, Home, Info, MapPin, Search, ShieldAlert, ShieldCheck } from "lucide-react";
import type { Opportunity } from "@/lib/opportunities";
import { useSaved } from "@/lib/saved";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/opportunities", label: "Browse", icon: Search },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/safety", label: "Safety", icon: ShieldCheck },
  { to: "/about", label: "About", icon: Info },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-5 w-5" />
          </span>
          <span>Opportunity<span className="text-accent">Connect</span></span>
        </Link>
        <nav className="hidden gap-1 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-primary"
              activeProps={{ className: "bg-teal-soft text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav aria-label="Mobile" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-card md:hidden">
      {NAV.map((n) => (
        <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
          className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold text-muted-foreground"
          activeProps={{ className: "text-accent" }}>
          <n.icon className="h-5 w-5" />
          {n.label}
        </Link>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card pb-20 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        <p className="flex gap-2"><ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <span><strong className="text-foreground">Disclaimer:</strong> Listings on OpportunityConnect are demonstration data, not verified vacancies. Always independently verify employers and job adverts before sharing personal information. Never pay any fee to apply for a job.</span>
        </p>
        <p className="mt-4">© 2026 OpportunityConnect · A community prototype for South African job seekers.</p>
      </div>
    </footer>
  );
}

export function DemoBadge() {
  return <span className="rounded-full bg-warning-soft px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-foreground">Demo listing · not verified</span>;
}

export function SaveButton({ opp, large }: { opp: Opportunity; large?: boolean }) {
  const { isSaved, toggle } = useSaved();
  const s = isSaved(opp.id);
  const Icon = s ? BookmarkCheck : Bookmark;
  return (
    <button type="button" onClick={(e) => { e.preventDefault(); toggle(opp.id, opp.title); }}
      aria-pressed={s} aria-label={s ? "Unsave opportunity" : "Save opportunity"}
      className={`inline-flex items-center gap-2 rounded-lg border font-semibold transition ${s ? "border-accent bg-teal-soft text-primary" : "border-border bg-card text-muted-foreground hover:border-accent hover:text-primary"} ${large ? "px-4 py-3" : "p-2"}`}>
      <Icon className="h-5 w-5" />
      {large && (s ? "Saved" : "Save")}
    </button>
  );
}

export function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-teal-soft px-2.5 py-1 text-xs font-bold text-primary">{opp.type}</span>
          <h3 className="mt-3 text-lg font-bold leading-snug">
            <Link to="/opportunities/$id" params={{ id: opp.id }} className="hover:text-accent">{opp.title}</Link>
          </h3>
          <p className="text-sm text-muted-foreground">{opp.organisation}</p>
        </div>
        <SaveButton opp={opp} />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{opp.location}</span>
        <span>{opp.arrangement}</span>
        <span>{opp.category}</span>
      </div>
      <div className="mt-3"><DemoBadge /></div>
      <div className="mt-auto flex gap-2 pt-5">
        <Link to="/opportunities/$id" params={{ id: opp.id }} className="flex-1 rounded-lg border border-border px-3 py-2.5 text-center text-sm font-semibold text-primary hover:bg-secondary">View details</Link>
        <a href={opp.applyUrl} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90">Apply</a>
      </div>
    </article>
  );
}

export function EmptyState({ icon: Icon, title, text, children }: { icon: typeof Search; title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <Icon className="mx-auto h-10 w-10 text-accent" />
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{text}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
