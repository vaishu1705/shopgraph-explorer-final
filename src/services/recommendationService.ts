import {
  CURRENT_USER_ID,
  productById,
} from "@/data/mockData";

import type {
  Product,
  Recommendation,
  ReasonStep,
} from "@/data/types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  "https://shopgraph-explorer-final.onrender.com";

interface BackendRecommendation {
  product_id: number;
  name: string;
  brand: string;
  category: string | null;
  price: number;
  rating: number;
  connection_count: number;
  score: number;
  reason: string;
  relationship: string;
}

interface BackendResponse {
  user_id: number;
  count: number;
  recommendations: BackendRecommendation[];
}


/*
 * Convert backend product into the Product type
 * already used by your ShopGraph UI.
 *
 * First try the existing mockData product so
 * we retain its image, description, features,
 * reviews, etc.
 */
function convertProduct(
  item: BackendRecommendation,
): Product {

  const localProduct =
    productById(`p-${item.product_id}`);

  if (localProduct) {
    return {
      ...localProduct,

      // These values now come from CognoDB
      name: item.name,
      price: item.price,
      rating: item.rating,
    };
  }

  /*
   * Fallback if the product isn't present
   * in local mockData.
   */
  return {
    id: `p-${item.product_id}`,

    name: item.name,

    brandId:
      `brand-${item.brand
        .toLowerCase()
        .replace(/\s+/g, "-")}`,

    categoryId:
      item.category
        ? `cat-${item.category
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        : "cat-other",

    price: item.price,

    rating: item.rating,

    reviews: 0,

    image: "",

    kind:
      item.category ??
      "Product",

    description: "",

    features: [],

    popularity:
      Math.round(item.rating * 20),
  };
}


/*
 * Convert the backend relationship into
 * one of the four UI sections.
 */
function getBucket(
  relationship: string,
): Recommendation["bucket"] {

  const relation =
    relationship.toUpperCase();

  if (
    relation.includes("ALSO_BOUGHT")
  ) {
    return "because";
  }

  if (
    relation.includes("COMPLEMENTARY")
  ) {
    return "setup";
  }

  if (
    relation.includes("SIMILAR")
  ) {
    return "similar";
  }

  return "picked";
}


/*
 * Create the explanation path shown
 * in the WhyPanel.
 */
function createPath(
  item: BackendRecommendation,
): ReasonStep[] {

  const relation =
    item.relationship
      .replaceAll("_", " ")
      .toLowerCase();

  return [
    {
      label: "You",
      kind: "user",
    },

    {
      label: relation,
      kind: "relation",
    },

    {
      label: item.name,
      kind: "product",
    },
  ];
}


/**
 * GET /api/recommendations/:userId
 *
 * React
 *   ↓
 * recommendationService
 *   ↓
 * FastAPI
 *   ↓
 * CognoDB
 */
export async function getRecommendations(
  userId: string = CURRENT_USER_ID,
): Promise<Recommendation[]> {

  const numericUserId =
    userId.replace("u-", "");

  const response =
    await fetch(
      `${API_BASE_URL}/api/recommendations/${numericUserId}`,
    );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch recommendations: ${response.status}`,
    );
  }

  const data: BackendResponse =
    await response.json();

  return data.recommendations.map(
    (item) => {

      const product =
        convertProduct(item);

      return {
        productId:
          product.id,

        product,

        score:
          Math.round(item.score),

        bucket:
          getBucket(
            item.relationship,
          ),

        reason:
          item.reason,

        path:
          createPath(item),
      };
    },
  );
}


/**
 * Get explanation for one recommendation.
 */
export async function getRecommendationReason(
  userId: string,
  productId: string,
): Promise<Recommendation | null> {

  const recommendations =
    await getRecommendations(userId);

  return (
    recommendations.find(
      (recommendation) =>
        recommendation.productId ===
        productId,
    ) ?? null
  );
}