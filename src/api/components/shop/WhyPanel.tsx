import { useEffect } from "react";
import { X } from "lucide-react";
import type { Recommendation } from "@/data/types";
import { RelationPath } from "./RelationPath";

export function WhyPanel({
  recommendation,
  onClose,
}: {
  recommendation: Recommendation | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!recommendation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [recommendation, onClose]);

  if (!recommendation) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close explanation"
        onClick={onClose}
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Why you're seeing this"
        className="relative flex h-full w-full flex-col overflow-y-auto border-l border-border bg-card shadow-lift duration-300 animate-in slide-in-from-right sm:max-w-md"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <span className="eyebrow">Explainable recommendation</span>
            <h2 className="mt-1 text-2xl">Why you&apos;re seeing this</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </header>

        <div className="space-y-6 p-6">
          <RelationPath steps={recommendation.path} />

          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-sm leading-relaxed">{recommendation.reason}</p>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-accent-soft px-5 py-4">
            <span className="text-sm font-semibold text-accent-foreground">Match strength</span>
            <span className="font-display text-2xl text-accent-foreground">
              {recommendation.score}%
            </span>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Every box above is a thing in the graph, and every arrow is a relationship between two
            things. Nothing here is guesswork — this is the path ShopGraph followed.
          </p>
        </div>
      </aside>
    </div>
  );
}
