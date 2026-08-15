const items = [
  { label: "User", className: "bg-primary" },
  { label: "Product", className: "bg-card border border-border" },
  { label: "Category", className: "bg-accent-soft border border-accent" },
  { label: "Brand", className: "bg-muted-foreground" },
];

export function GraphLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-[4px] ${item.className}`} />
          {item.label}
        </span>
      ))}
      <span className="flex items-center gap-2">
        <span className="h-px w-6 bg-muted-foreground" />
        Relationship
      </span>
    </div>
  );
}
