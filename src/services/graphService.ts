/* =========================================================
   GRAPH SERVICE
   React → FastAPI → CognoDB
========================================================= */


/* =========================================================
   TYPES
========================================================= */

export type GraphNodeType =
  | "user"
  | "product"
  | "category"
  | "brand";


export interface GraphNodeData {
  id: string;
  label: string;
  type: GraphNodeType;

  image?: string;

  brand?: string;

  category?: string;

  price?: number;

  x: number;

  y: number;
}


export interface GraphEdgeData {
  id: string;

  source: string;

  target: string;

  label: string;
}


export interface GraphPayload {
  nodes: GraphNodeData[];

  edges: GraphEdgeData[];
}


/* =========================================================
   BACKEND TYPES
========================================================= */

interface BackendNode {
  id: string | number;

  labels?: string[];

  properties?: Record<
    string,
    unknown
  >;
}


interface BackendRelationship {
  id: string | number;

  type: string;

  source: string | number;

  target: string | number;

  properties?: Record<
    string,
    unknown
  >;
}


interface BackendGraphResponse {
  user_id?: string | number;

  nodes?: BackendNode[];

  relationships?: BackendRelationship[];
}


/* =========================================================
   API BASE URL
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  "http://127.0.0.1:8000";


/* =========================================================
   HELPERS
========================================================= */

function getString(
  value: unknown,
): string | undefined {

  if (
    typeof value ===
    "string"
  ) {
    return value;
  }


  if (
    typeof value ===
    "number"
  ) {
    return String(value);
  }


  return undefined;
}


function getNumber(
  value: unknown,
): number | undefined {

  if (
    typeof value ===
    "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }


  if (
    typeof value ===
    "string"
  ) {

    const number =
      Number(value);

    if (
      Number.isFinite(number)
    ) {
      return number;
    }

  }


  return undefined;
}


/* =========================================================
   NODE TYPE
========================================================= */

function getNodeType(
  labels: string[],
): GraphNodeType | null {

  if (
    labels.includes("User")
  ) {
    return "user";
  }


  if (
    labels.includes("Product")
  ) {
    return "product";
  }


  if (
    labels.includes("Category")
  ) {
    return "category";
  }


  if (
    labels.includes("Brand")
  ) {
    return "brand";
  }


  return null;
}


/* =========================================================
   FRONTEND NODE ID
========================================================= */

function getFrontendNodeId(
  node: BackendNode,
): string {

  const properties =
    node.properties ?? {};

  const labels =
    node.labels ?? [];


  const propertyId =
    getString(
      properties.id,
    );


  const rawId =
    propertyId ??
    String(node.id);


  if (
    labels.includes("User")
  ) {
    return `u-${rawId}`;
  }


  if (
    labels.includes("Product")
  ) {
    return `p-${rawId}`;
  }


  if (
    labels.includes("Category")
  ) {
    return `cat-${rawId}`;
  }


  if (
    labels.includes("Brand")
  ) {
    return `brand-${rawId}`;
  }


  return rawId;
}


/* =========================================================
   CONVERT BACKEND NODE
========================================================= */

function convertNode(
  node: BackendNode,
  index: number,
): GraphNodeData | null {

  const properties =
    node.properties ?? {};

  const labels =
    node.labels ?? [];


  const type =
    getNodeType(labels);


  if (!type) {
    return null;
  }


  const id =
    getFrontendNodeId(node);


  const label =
    getString(
      properties.name,
    ) ??
    getString(
      properties.title,
    ) ??
    getString(
      properties.label,
    ) ??
    type;


  const image =
    getString(
      properties.image,
    ) ??
    getString(
      properties.imageUrl,
    ) ??
    getString(
      properties.image_url,
    );


  const brand =
    getString(
      properties.brand,
    ) ??
    getString(
      properties.brandName,
    );


  const category =
    getString(
      properties.category,
    ) ??
    getString(
      properties.categoryName,
    );


  const price =
    getNumber(
      properties.price,
    );


  /* -------------------------------------------------------
     USER POSITION
  ------------------------------------------------------- */

  if (
    type === "user"
  ) {

    return {
      id,

      label,

      type,

      image,

      brand,

      category,

      price,

      x: 100,

      y: 280,
    };

  }


  /* -------------------------------------------------------
     PRODUCT POSITION
  ------------------------------------------------------- */

  if (
    type === "product"
  ) {

    const productIndex =
      index % 12;


    const angle =
      (productIndex /
        12) *
      Math.PI *
      2;


    const radius =
      230;


    return {

      id,

      label,

      type,

      image,

      brand,

      category,

      price,

      x:
        430 +
        Math.cos(angle) *
          radius,

      y:
        280 +
        Math.sin(angle) *
          radius,

    };

  }


  /* -------------------------------------------------------
     CATEGORY POSITION
  ------------------------------------------------------- */

  if (
    type === "category"
  ) {

    return {

      id,

      label,

      type,

      image,

      brand,

      category,

      price,

      x: 430,

      y:
        70 +
        (index % 6) *
          80,

    };

  }


  /* -------------------------------------------------------
     BRAND POSITION
  ------------------------------------------------------- */

  return {

    id,

    label,

    type,

    image,

    brand,

    category,

    price,

    x: 760,

    y:
      100 +
      (index % 6) *
        80,

  };
}


/* =========================================================
   GET GRAPH
========================================================= */

export async function getGraph(
  userId: string,
): Promise<GraphPayload> {

  /*
   * The frontend normally sends:
   *
   * u-1
   *
   * Backend expects:
   *
   * 1
   */

  const numericUserId =
    userId.startsWith("u-")
      ? userId.substring(2)
      : userId;


  const url =
    `${API_BASE_URL}/api/graph/${encodeURIComponent(
      numericUserId,
    )}`;


  const response =
    await fetch(url);


  if (!response.ok) {

    throw new Error(
      `Failed to load graph: ${response.status} ${response.statusText}`,
    );

  }


  const data =
    (await response.json()) as BackendGraphResponse;


  const backendNodes =
    Array.isArray(data.nodes)
      ? data.nodes
      : [];


  const backendRelationships =
    Array.isArray(
      data.relationships,
    )
      ? data.relationships
      : [];


  /* -------------------------------------------------------
     CONVERT NODES
  ------------------------------------------------------- */

  const nodes: GraphNodeData[] =
    backendNodes
      .map(
        (
          node,
          index,
        ) =>
          convertNode(
            node,
            index,
          ),
      )
      .filter(
        (
          node,
        ): node is GraphNodeData =>
          node !== null,
      );


  /* -------------------------------------------------------
     CONVERT RELATIONSHIPS
  ------------------------------------------------------- */

  const edges: GraphEdgeData[] =
    backendRelationships
      .map(
        (
          relationship,
        ) => {

          const sourceBackend =
            backendNodes.find(
              (node) =>
                String(
                  node.id,
                ) ===
                String(
                  relationship.source,
                ),
            );


          const targetBackend =
            backendNodes.find(
              (node) =>
                String(
                  node.id,
                ) ===
                String(
                  relationship.target,
                ),
            );


          const source =
            sourceBackend
              ? getFrontendNodeId(
                  sourceBackend,
                )
              : String(
                  relationship.source,
                );


          const target =
            targetBackend
              ? getFrontendNodeId(
                  targetBackend,
                )
              : String(
                  relationship.target,
                );


          return {

            id: String(
              relationship.id,
            ),

            source,

            target,

            label:
              relationship.type,

          };

        },
      );


  return {

    nodes,

    edges,

  };
}


/* =========================================================
   NODE DETAILS
========================================================= */

export interface NodeDetails {

  id: string;

  label: string;

  type: GraphNodeType;

  brand?: string;

  category?: string;

  price?: number;

  image?: string;

  connected: {

    label: string;

    relation: string;

  }[];

}


/* =========================================================
   GET NODE DETAILS
========================================================= */

export async function getNodeDetails(
  nodeId: string,

  payload: GraphPayload,
): Promise<NodeDetails> {

  const node =
    payload.nodes.find(
      (
        item,
      ) =>
        item.id ===
        nodeId,
    );


  if (!node) {

    throw new Error(
      `Graph node ${nodeId} not found`,
    );

  }


  const connected =
    payload.edges
      .filter(
        (edge) =>
          edge.source ===
            nodeId ||
          edge.target ===
            nodeId,
      )
      .map(
        (edge) => {

          const otherId =
            edge.source ===
            nodeId
              ? edge.target
              : edge.source;


          const other =
            payload.nodes.find(
              (
                item,
              ) =>
                item.id ===
                otherId,
            );


          return {

            label:
              other?.label ??
              otherId,

            relation:
              edge.label,

          };

        },
      );


  return {

    id:
      node.id,

    label:
      node.label,

    type:
      node.type,

    brand:
      node.brand,

    category:
      node.category,

    price:
      node.price,

    image:
      node.image,

    connected,

  };
}


/* =========================================================
   RELATIONSHIP COUNT
========================================================= */

export function relationshipCount(
  nodeId: string,

  payload?: GraphPayload,
): number {

  if (!payload) {
    return 0;
  }


  return payload.edges.filter(
    (edge) =>
      edge.source ===
        nodeId ||
      edge.target ===
        nodeId,
  ).length;
}