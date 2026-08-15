import { productById } from "@/data/mockData";
import type { Product, User } from "@/data/types";

const API_BASE_URL = "http://127.0.0.1:8000";


// =========================================================
// TYPES
// =========================================================

export interface ActivityEntry {
  product: Product;
  at: string;
}

export interface UserActivity {
  purchased: ActivityEntry[];
  viewed: ActivityEntry[];
  liked: ActivityEntry[];
}

export interface UserStats {
  purchased: number;
  viewed: number;
  liked: number;
  recommendations: number;
}

interface BackendUser {
  id: number;
  name: string;
  email: string;
  avatarInitials: string;
  favoriteCategories: string[];
  favoriteBrands: string[];
  interests: string[];
}

interface BackendActivityProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
}

interface BackendActivityEntry {
  type: string;
  product: BackendActivityProduct;
}


// =========================================================
// CONVERT USER ID
// =========================================================

function normalizeUserId(userId: string): string {
  /*
   * Frontend may use:
   *
   * u-1
   *
   * Backend expects:
   *
   * 1
   */

  return userId.replace(/^u-/, "");
}


// =========================================================
// CONVERT BACKEND PRODUCT
// =========================================================

function convertActivityProduct(
  data: BackendActivityProduct,
): Product {

  const local = productById(`p-${data.id}`);

  if (local) {
    return {
      ...local,
      name: data.name,
      price: data.price,
      rating: data.rating,
    };
  }

  return {
    id: `p-${data.id}`,
    name: data.name,
    brandId: "",
    categoryId: "",
    price: data.price,
    rating: data.rating,
    reviews: 0,
    image: "",
    kind: "product",
    description: "",
    features: [],
    popularity: Math.round(data.rating * 20),
  };
}


// =========================================================
// GET USER
// =========================================================

export async function getUser(
  userId: string = "u-1",
): Promise<User> {

  const numericUserId =
    normalizeUserId(userId);

  const response = await fetch(
    `${API_BASE_URL}/api/users/${numericUserId}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user: ${response.status}`,
    );
  }

  const data: BackendUser =
    await response.json();

  return {
    id: `u-${data.id}`,
    name: data.name,
    email: data.email,
    avatarInitials: data.avatarInitials,
    favoriteCategories:
      data.favoriteCategories,
    favoriteBrands:
      data.favoriteBrands,
    interests:
      data.interests,
  };
}


// =========================================================
// GET USER ACTIVITY
// =========================================================

export async function getUserActivity(
  userId: string = "u-1",
): Promise<UserActivity> {

  const numericUserId =
    normalizeUserId(userId);

  const response = await fetch(
    `${API_BASE_URL}/api/users/${numericUserId}/activity`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch activity: ${response.status}`,
    );
  }

  const data = await response.json();


  function convertEntries(
    entries: BackendActivityEntry[],
  ): ActivityEntry[] {

    return entries
      .filter(
        (entry) =>
          entry.product !== null &&
          entry.product !== undefined,
      )
      .map((entry) => ({
        product:
          convertActivityProduct(
            entry.product,
          ),
        at: "",
      }));
  }


  return {
    purchased:
      convertEntries(
        data.purchased ?? [],
      ),

    viewed:
      convertEntries(
        data.viewed ?? [],
      ),

    liked:
      convertEntries(
        data.liked ?? [],
      ),
  };
}


// =========================================================
// GET USER STATISTICS
// =========================================================

export async function getUserStats(
  userId: string = "u-1",
): Promise<UserStats> {

  const numericUserId =
    normalizeUserId(userId);

  const response = await fetch(
    `${API_BASE_URL}/api/users/${numericUserId}/stats`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch stats: ${response.status}`,
    );
  }

  return response.json();
}