import {
  products as localProducts,
  productById,
} from "@/data/mockData";

import type { Product } from "@/data/types";

export interface ProductQuery {
  search?: string;
  categoryId?: string;
  brandId?: string;
  maxPrice?: number;
  minRating?: number;
  sort?: "recommended" | "popular" | "price-asc" | "price-desc";
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  "https://shopgraph-explorer-final.onrender.com";
interface BackendProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
}

interface BackendProductResponse {
  products?: BackendProduct[];
}

function convertProduct(data: BackendProduct): Product {
  const local = productById(`p-${data.id}`);

  if (local) {
    return {
      ...local,
      name: data.name,
      price: data.price,
      rating: data.rating,
    };
  }

  const brandMap: Record<string, string> = {
    Lenovo: "brand-lenovo",
    Apple: "brand-apple",
    Samsung: "brand-samsung",
    Sony: "brand-sony",
    Logitech: "brand-logitech",
    Keychron: "brand-keychron",
    Dell: "brand-dell",
    Anker: "brand-anker",
    HP: "brand-hp",
    JBL: "brand-jbl",
  };

  const categoryMap: Record<string, string> = {
    Laptops: "cat-laptops",
    Smartphones: "cat-smartphones",
    Audio: "cat-audio",
    Mice: "cat-accessories",
    Keyboards: "cat-accessories",
    Monitors: "cat-monitors",
    Tablets: "cat-tablets",
    "Smart Devices": "cat-wearables",
    Accessories: "cat-accessories",
    Gaming: "cat-accessories",
  };

  return {
    id: `p-${data.id}`,
    name: data.name,
    brandId:
      brandMap[data.brand] ??
      `brand-${data.brand.toLowerCase()}`,
    categoryId:
      categoryMap[data.category] ??
      `cat-${data.category
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    price: data.price,
    rating: data.rating,
    reviews: 0,
    image: "",
    kind: data.category.toLowerCase(),
    description: "",
    features: [],
    popularity: Math.round(data.rating * 20),
  };
}

/* ---------------------------------------------------------
   GET /api/products
--------------------------------------------------------- */

export async function getProducts(
  query: ProductQuery = {},
): Promise<Product[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/products`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status}`,
    );
  }

  const data: BackendProductResponse =
    await response.json();

  let list: Product[] = (data.products ?? []).map(
    convertProduct,
  );

  const {
    search = "",
    categoryId,
    brandId,
    maxPrice,
    minRating,
    sort = "recommended",
  } = query;

  const term = search.trim().toLowerCase();

  list = list.filter((p) => {
    if (
      categoryId &&
      p.categoryId !== categoryId
    ) {
      return false;
    }

    if (
      brandId &&
      p.brandId !== brandId
    ) {
      return false;
    }

    if (
      maxPrice !== undefined &&
      p.price > maxPrice
    ) {
      return false;
    }

    if (
      minRating !== undefined &&
      p.rating < minRating
    ) {
      return false;
    }

    if (term) {
      const haystack =
        `${p.name} ${p.kind} ${p.brandId} ${p.categoryId}`
          .toLowerCase();

      if (!haystack.includes(term)) {
        return false;
      }
    }

    return true;
  });

  list.sort((a, b) => {
    if (sort === "price-asc") {
      return a.price - b.price;
    }

    if (sort === "price-desc") {
      return b.price - a.price;
    }

    if (sort === "popular") {
      return b.popularity - a.popularity;
    }

    return (
      b.rating * 20 +
      b.popularity -
      (a.rating * 20 + a.popularity)
    );
  });

  return list;
}

/* ---------------------------------------------------------
   GET /api/products/:id
--------------------------------------------------------- */

export async function getProduct(
  id: string,
): Promise<Product> {
  const numericId = id.replace("p-", "");

  const response = await fetch(
    `${API_BASE_URL}/api/products/${numericId}`,
  );

  if (!response.ok) {
    throw new Error(
      `Product ${id} not found`,
    );
  }

  const data: BackendProduct =
    await response.json();

  return convertProduct(data);
}

/* ---------------------------------------------------------
   Relationship helper
--------------------------------------------------------- */

async function getRelatedProducts(
  id: string,
  endpoint: "similar" | "complementary" | "also-bought",
  count: number,
): Promise<Product[]> {
  const numericId = id.replace("p-", "");

  const response = await fetch(
    `${API_BASE_URL}/api/products/${numericId}/${endpoint}?count=${count}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${endpoint} products: ${response.status}`,
    );
  }

  const data: BackendProductResponse =
    await response.json();

  return (data.products ?? []).map(
    convertProduct,
  );
}

/* ---------------------------------------------------------
   Similar products
--------------------------------------------------------- */

export async function getSimilarProducts(
  id: string,
  count = 4,
): Promise<Product[]> {
  return getRelatedProducts(
    id,
    "similar",
    count,
  );
}

/* ---------------------------------------------------------
   Complementary products
--------------------------------------------------------- */

export async function getComplementaryProducts(
  id: string,
  count = 5,
): Promise<Product[]> {
  return getRelatedProducts(
    id,
    "complementary",
    count,
  );
}

/* ---------------------------------------------------------
   Customers also bought
--------------------------------------------------------- */

export async function getAlsoBoughtProducts(
  id: string,
  count = 4,
): Promise<Product[]> {
  return getRelatedProducts(
    id,
    "also-bought",
    count,
  );
}