import { ArrowRight } from "lucide-react";
import type { ReasonStep } from "@/data/types";

interface RelationPathProps {
  steps: ReasonStep[];
  className?: string;
}

export function RelationPath({
  steps,
  className = "",
}: RelationPathProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      {steps.map((step, index) => {
        const isRelation =
          step.kind === "relation";

        return (
          <div
            key={`${step.label}-${index}`}
            className="flex items-center gap-2"
          >
            <span
              className={
                isRelation
                  ? `
                    rounded-full
                    bg-muted
                    px-2.5
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-muted-foreground
                  `
                  : `
                    rounded-lg
                    border
                    border-border
                    bg-card
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-foreground
                  `
              }
            >
              {step.label}
            </span>

            {index < steps.length - 1 && (
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );
}