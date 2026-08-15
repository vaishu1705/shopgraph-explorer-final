import { useMemo, useState } from "react";
import type {
  GraphPayload,
  GraphNodeData,
} from "@/services/graphService";

interface GraphCanvasProps {
  payload: GraphPayload;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/* =========================================================
   GRAPH SETTINGS
========================================================= */

const NODE_WIDTH = 180;
const NODE_HEIGHT = 82;

const CANVAS_WIDTH = 1150;
const CANVAS_HEIGHT = 650;

/* =========================================================
   NODE STYLES
========================================================= */

function getNodeClass(type: GraphNodeData["type"]) {
  switch (type) {
    case "user":
      return "border-black bg-zinc-100";

    case "product":
      return "border-red-400 bg-white";

    case "category":
      return "border-stone-300 bg-stone-50";

    case "brand":
      return "border-stone-500 bg-stone-100";

    default:
      return "border-border bg-card";
  }
}

/* =========================================================
   GRAPH CANVAS
========================================================= */

export default function GraphCanvas({
  payload,
  selectedId,
  onSelect,
}: GraphCanvasProps) {
  const [zoom, setZoom] = useState(0.85);

  /* =======================================================
     VISIBLE NODES
  ======================================================= */

  const visibleNodes = useMemo(() => {
    const user = payload.nodes.find(
      (node) => node.type === "user",
    );

    const products = payload.nodes
      .filter((node) => node.type === "product")
      .slice(0, 9);

    const categories = payload.nodes
      .filter((node) => node.type === "category")
      .slice(0, 3);

    const brands = payload.nodes
      .filter((node) => node.type === "brand")
      .slice(0, 4);

    return [
      ...(user ? [user] : []),
      ...products,
      ...categories,
      ...brands,
    ];
  }, [payload.nodes]);

  /* =======================================================
     VISIBLE EDGES
  ======================================================= */

  const visibleEdges = useMemo(() => {
    const ids = new Set(
      visibleNodes.map((node) => node.id),
    );

    return payload.edges.filter(
      (edge) =>
        ids.has(edge.source) &&
        ids.has(edge.target),
    );
  }, [payload.edges, visibleNodes]);

  /* =======================================================
     FIXED NODE POSITIONS
     
     USER       -> LEFT
     PRODUCTS   -> CENTER
     BRANDS     -> FAR RIGHT
     CATEGORIES -> BOTTOM
  ======================================================= */

  const positions = useMemo(() => {
    const map = new Map<
      string,
      { x: number; y: number }
    >();

    const users = visibleNodes.filter(
      (node) => node.type === "user",
    );

    const products = visibleNodes.filter(
      (node) => node.type === "product",
    );

    const categories = visibleNodes.filter(
      (node) => node.type === "category",
    );

    const brands = visibleNodes.filter(
      (node) => node.type === "brand",
    );

    /* =====================================================
       USER
    ===================================================== */

    users.forEach((node, index) => {
      map.set(node.id, {
        x: 35,
        y: 280 + index * 120,
      });
    });

    /* =====================================================
       PRODUCTS
       
       IMPORTANT:
       The third column ends before the brands begin.
    ===================================================== */

    const productColumns = 3;

    products.forEach((node, index) => {
      const column =
        index % productColumns;

      const row =
        Math.floor(
          index / productColumns,
        );

      map.set(node.id, {
        x: 245 + column * 200,
        y: 90 + row * 135,
      });
    });

    /* =====================================================
       BRANDS
       
       Product column 3:
       x = 645
       width = 180
       ends at 825

       Brand:
       x = 900

       Gap = 75px
    ===================================================== */

    brands.forEach((node, index) => {
      map.set(node.id, {
        x: 900,
        y: 90 + index * 125,
      });
    });

    /* =====================================================
       CATEGORIES
    ===================================================== */

    categories.forEach((node, index) => {
      map.set(node.id, {
        x: 245 + index * 200,
        y: 520,
      });
    });

    return map;
  }, [visibleNodes]);

  /* =======================================================
     RESET ZOOM
  ======================================================= */

  const resetZoom = () => {
    setZoom(0.85);
  };

  /* =======================================================
     CLEAR SELECTION
  ======================================================= */

  const clearSelection = () => {
    onSelect("");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="relative h-[620px] w-full overflow-hidden rounded-3xl border border-border bg-card">

      {/* ===================================================
          CLEAR SELECTION
      =================================================== */}

      {selectedId && (
        <button
          type="button"
          onClick={clearSelection}
          className="
            absolute
            left-4
            top-4
            z-[200]
            rounded-xl
            border
            border-border
            bg-white
            px-4
            py-2
            text-xs
            font-medium
            shadow-md
            transition
            hover:bg-muted
          "
        >
          Clear selection
        </button>
      )}

      {/* ===================================================
          ZOOM CONTROLS
      =================================================== */}

      <div
        className="
          absolute
          right-4
          top-4
          z-[200]
          flex
          items-center
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-white
          shadow-md
        "
      >
        {/* PLUS */}

        <button
          type="button"
          onClick={() =>
            setZoom((value) =>
              Math.min(
                1.2,
                value + 0.1,
              ),
            )
          }
          className="
            px-4
            py-2
            text-lg
            hover:bg-muted
          "
          aria-label="Zoom in"
        >
          +
        </button>

        {/* MINUS */}

        <button
          type="button"
          onClick={() =>
            setZoom((value) =>
              Math.max(
                0.6,
                value - 0.1,
              ),
            )
          }
          className="
            border-l
            border-border
            px-4
            py-2
            text-lg
            hover:bg-muted
          "
          aria-label="Zoom out"
        >
          −
        </button>

        {/* RESET */}

        <button
          type="button"
          onClick={resetZoom}
          className="
            border-l
            border-border
            px-4
            py-2
            text-xs
            hover:bg-muted
          "
        >
          Reset
        </button>
      </div>

      {/* ===================================================
          GRAPH VIEW
      =================================================== */}

      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          overflow-auto
          p-4
        "
      >
        {/* =================================================
            GRAPH CANVAS
        ================================================= */}

        <div
          className="
            relative
            shrink-0
            transition-transform
            duration-200
          "
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${zoom})`,
            transformOrigin:
              "center center",

            backgroundImage:
              "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",

            backgroundSize:
              "28px 28px",
          }}
        >

          {/* ===============================================
              RELATIONSHIP LINES
          =============================================== */}

          <svg
            className="
              pointer-events-none
              absolute
              left-0
              top-0
            "
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          >
            {visibleEdges.map(
              (edge) => {
                const source =
                  positions.get(
                    edge.source,
                  );

                const target =
                  positions.get(
                    edge.target,
                  );

                if (
                  !source ||
                  !target
                ) {
                  return null;
                }

                const x1 =
                  source.x +
                  NODE_WIDTH / 2;

                const y1 =
                  source.y +
                  NODE_HEIGHT / 2;

                const x2 =
                  target.x +
                  NODE_WIDTH / 2;

                const y2 =
                  target.y +
                  NODE_HEIGHT / 2;

                const isSelected =
                  selectedId ===
                    edge.source ||
                  selectedId ===
                    edge.target;

                return (
                  <g key={edge.id}>

                    {/* LINE */}

                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={
                        isSelected
                          ? "#111827"
                          : "#d6d3d1"
                      }
                      strokeWidth={
                        isSelected
                          ? 2.5
                          : 1
                      }
                      opacity={
                        selectedId &&
                        !isSelected
                          ? 0.08
                          : 0.55
                      }
                    />

                    {/* RELATIONSHIP LABEL */}

                    {isSelected && (
                      <g>
                        <rect
                          x={
                            (x1 + x2) /
                              2 -
                            50
                          }
                          y={
                            (y1 + y2) /
                              2 -
                            11
                          }
                          width="100"
                          height="22"
                          rx="11"
                          fill="white"
                          stroke="#d6d3d1"
                        />

                        <text
                          x={
                            (x1 + x2) /
                            2
                          }
                          y={
                            (y1 + y2) /
                              2 +
                            3
                          }
                          textAnchor="middle"
                          fontSize="8"
                          fontWeight="600"
                          fill="#57534e"
                        >
                          {edge.label}
                        </text>
                      </g>
                    )}
                  </g>
                );
              },
            )}
          </svg>

          {/* ===============================================
              NODES
          =============================================== */}

          {visibleNodes.map(
            (node) => {
              const position =
                positions.get(
                  node.id,
                );

              if (!position) {
                return null;
              }

              const isSelected =
                selectedId ===
                node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() =>
                    onSelect(
                      node.id,
                    )
                  }
                  className={[
                    "absolute",
                    "flex",
                    "flex-col",
                    "justify-center",
                    "rounded-2xl",
                    "border-2",
                    "px-4",
                    "text-left",
                    "shadow-sm",
                    "transition-all",
                    "duration-200",
                    "hover:-translate-y-1",
                    "hover:shadow-lg",
                    getNodeClass(
                      node.type,
                    ),

                    isSelected
                      ? "z-50 ring-2 ring-black ring-offset-2"
                      : "z-10",
                  ].join(" ")}
                  style={{
                    left:
                      position.x,

                    top:
                      position.y,

                    width:
                      NODE_WIDTH,

                    height:
                      NODE_HEIGHT,
                  }}
                >

                  {/* NODE TYPE */}

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-muted-foreground
                    "
                  >
                    {node.type}
                  </span>

                  {/* NODE NAME */}

                  <span
                    className="
                      mt-1
                      truncate
                      text-sm
                      font-semibold
                      text-foreground
                    "
                  >
                    {node.label}
                  </span>

                  {/* PRICE */}

                  {node.price !==
                    undefined && (
                    <span
                      className="
                        mt-1
                        text-xs
                        text-muted-foreground
                      "
                    >
                      ₹
                      {node.price.toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  )}
                </button>
              );
            },
          )}

          {/* ===============================================
              INSTRUCTION
          =============================================== */}

          <div
            className="
              absolute
              bottom-4
              left-1/2
              z-40
              -translate-x-1/2
              rounded-full
              border
              border-border
              bg-white/95
              px-5
              py-2
              text-xs
              text-muted-foreground
              shadow-sm
            "
          >
            {selectedId
              ? "Selected node • connected relationships highlighted"
              : "Click any node to explore its connections"}
          </div>

        </div>
      </div>
    </div>
  );
}