import type {
  Product,
  Recommendation,
} from "../data/types";

const API_BASE_URL = "https://shopgraph-explorer-final.onrender.com";
interface BackendProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
}

interface BackendRecommendation {
  product_id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  score: number;
  reason: string;
  relationship: string;
}

/* Convert FastAPI product → frontend Product */
function convertProduct(product: BackendProduct): Product {
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

  return {
    id: `p-${product.id}`,
    name: product.name,
    brandId:
      brandMap[product.brand] ??
      `brand-${product.brand.toLowerCase()}`,
    categoryId:
      categoryMap[product.category] ??
      `cat-${product.category
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    price: product.price,
    rating: product.rating,
    reviews: 0,
    image: "",
    kind: product.category.toLowerCase(),
    description: "",
    features: [],
    popularity: Math.round(product.rating * 20),
  };
}

/* Get products from CognoDB through FastAPI */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products.map(convertProduct);
}

/* Get one product */
export async function getProduct(
  productId: string
): Promise<Product> {
  const numericId = productId.replace("p-", "");

  const response = await fetch(
    `${API_BASE_URL}/api/products/${numericId}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const data: BackendProduct = await response.json();

  return convertProduct(data);
}

/* Get real graph-based recommendations */
export async function getRecommendations(
  userId: string
): Promise<Recommendation[]> {
  const numericUserId = userId.replace("u-", "");

  const response = await fetch(
    `${API_BASE_URL}/api/recommendations/${numericUserId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  const data = await response.json();

  return data.recommendations.map(
    (item: BackendRecommendation): Recommendation => {
      const product = convertProduct({
        id: item.product_id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        price: item.price,
        rating: item.rating,
      });

      return {
        productId: product.id,
        product,
        score: item.score,
        bucket: "because",
        reason: item.reason,
        path: [
          {
            label: item.relationship,
            kind: "relation",
          },
          {
            label: product.name,
            kind: "product",
          },
        ],
      };
    }
  );
}

/* Get real graph data */
export async function getGraph(userId: string) {
  const numericUserId = userId.replace("u-", "");

  const response = await fetch(
    `${API_BASE_URL}/api/graph/${numericUserId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch graph");
  }

  return response.json();
}