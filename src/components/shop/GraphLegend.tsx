export function GraphLegend() {
  const items = [
    { label: "User", className: "bg-primary" },
    { label: "Product", className: "bg-accent" },
    { label: "Category", className: "bg-secondary" },
    { label: "Brand", className: "bg-muted-foreground" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4">
      <span className="text-sm font-semibold">
        Graph legend
      </span>

      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span
            className={`h-3 w-3 rounded-full ${item.className}`}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
}