import { ArrowDown } from "lucide-react";
import type { ReasonStep } from "@/data/types";
import { cn } from "@/lib/utils";

const stepStyles: Record<ReasonStep["kind"], string> = {
  user: "bg-primary text-primary-foreground border-primary",
  product: "bg-card text-card-foreground border-border",
  category: "bg-accent-soft text-accent-foreground border-accent",
  brand: "bg-muted text-muted-foreground border-border",
  relation: "",
};

/** Clean vertical relationship path: node, arrow + label, node. */
export function RelationPath({ steps, className }: { steps: ReasonStep[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col items-center gap-1", className)}>
      {steps.map((step, i) =>
        step.kind === "relation" ? (
          <li key={`${step.label}-${i}`} className="flex flex-col items-center py-1">
            <ArrowDown className="h-4 w-4 text-accent" aria-hidden />
            <span className="eyebrow mt-1 text-accent-foreground">{step.label}</span>
          </li>
        ) : (
          <li
            key={`${step.label}-${i}`}
            className={cn(
              "w-full max-w-xs rounded-xl border px-4 py-3 text-center text-sm font-semibold shadow-soft",
              stepStyles[step.kind],
            )}
          >
            {step.label}
          </li>
        ),
      )}
    </ol>
  );
}
