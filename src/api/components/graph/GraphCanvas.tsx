import { useCallback, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Crosshair, RotateCcw } from "lucide-react";
import type { GraphPayload } from "@/services/graphService";
import { formatPrice } from "@/lib/format";

interface NodeData extends Record<string, unknown> {
  label: string;
  image?: string | undefined;
  brand?: string | undefined;
  price?: number | undefined;
}

function UserNode({ data }: NodeProps) {
  const d = data as NodeData;
  return (
    <div className="rounded-2xl border border-primary bg-primary px-5 py-3 text-center shadow-soft">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">
        User
      </span>
      <p className="font-display text-lg text-primary-foreground">{d.label}</p>
      <Handles />
    </div>
  );
}

function ProductNode({ data }: NodeProps) {
  const d = data as NodeData;
  return (
    <div className="w-52 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      {d.image ? (
        <img
          src={d.image}
          alt={d.label}
          width={1024}
          height={1024}
          className="h-24 w-full bg-surface object-cover"
        />
      ) : null}
      <div className="p-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Product
        </span>
        <p className="truncate text-sm font-semibold text-card-foreground">{d.label}</p>
        {d.price !== undefined ? (
          <p className="text-xs text-muted-foreground">{formatPrice(d.price)}</p>
        ) : null}
      </div>
      <Handles />
    </div>
  );
}

function CategoryNode({ data }: NodeProps) {
  const d = data as NodeData;
  return (
    <div className="rounded-2xl border border-accent bg-accent-soft px-5 py-3 text-center shadow-soft">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent-foreground/70">
        Category
      </span>
      <p className="text-sm font-semibold text-accent-foreground">{d.label}</p>
      <Handles />
    </div>
  );
}

function BrandNode({ data }: NodeProps) {
  const d = data as NodeData;
  return (
    <div className="rounded-2xl border border-border bg-muted-foreground px-5 py-3 text-center shadow-soft">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">
        Brand
      </span>
      <p className="text-sm font-semibold text-primary-foreground">{d.label}</p>
      <Handles />
    </div>
  );
}

function Handles() {
  return (
    <>
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
      <Handle type="target" position={Position.Left} id="l" className="!opacity-0" />
      <Handle type="source" position={Position.Right} id="r" className="!opacity-0" />
    </>
  );
}

const nodeTypes = {
  user: UserNode,
  product: ProductNode,
  category: CategoryNode,
  brand: BrandNode,
};

function Canvas({
  payload,
  selectedId,
  onSelect,
}: {
  payload: GraphPayload;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const { fitView, setViewport } = useReactFlow();

  const nodes = useMemo<Node[]>(
    () =>
      payload.nodes.map((n) => ({
        id: n.id,
        type: n.type,
        position: { x: n.x, y: n.y },
        data: { label: n.label, image: n.image, brand: n.brand, price: n.price },
        selected: n.id === selectedId,
      })),
    [payload.nodes, selectedId],
  );

  const edges = useMemo<Edge[]>(
    () =>
      payload.edges.map((e) => {
        const active = e.source === selectedId || e.target === selectedId;
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          animated: active,
          style: {
            stroke: active ? "var(--accent)" : "var(--muted-foreground)",
            strokeWidth: active ? 2 : 1,
          },
          labelStyle: { fontSize: 11, fontWeight: 700, fill: "var(--foreground)" },
          labelBgStyle: { fill: "var(--background)" },
          labelBgPadding: [6, 3] as [number, number],
          labelBgBorderRadius: 6,
        };
      }),
    [payload.edges, selectedId],
  );

  const reset = useCallback(() => {
    onSelect(null);
    setViewport({ x: 0, y: 0, zoom: 0.75 });
    setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 0);
  }, [fitView, onSelect, setViewport]);

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-3xl border border-border bg-card">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onSelect(node.id)}
        onPaneClick={() => onSelect(null)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1.5} color="var(--border)" />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>

      <div className="absolute right-4 top-4 flex gap-2">
        <button
          type="button"
          onClick={() => fitView({ padding: 0.2, duration: 400 })}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold shadow-soft transition-colors hover:bg-secondary"
        >
          <Crosshair className="h-3.5 w-3.5" aria-hidden /> Fit graph
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold shadow-soft transition-colors hover:bg-secondary"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset
        </button>
      </div>
    </div>
  );
}

export default function GraphCanvas(props: {
  payload: GraphPayload;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <ReactFlowProvider>
      <Canvas {...props} />
    </ReactFlowProvider>
  );
}
