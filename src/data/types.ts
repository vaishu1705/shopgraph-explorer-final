export type RelationType =
  | "PURCHASED"
  | "VIEWED"
  | "LIKED"
  | "SIMILAR_TO"
  | "COMPLEMENTARY_TO"
  | "BELONGS_TO"
  | "MADE_BY"
  | "ALSO_BOUGHT";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  brandId: string;
  categoryId: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  kind: string;
  description: string;
  features: string[];
  popularity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  favoriteCategories: string[];
  favoriteBrands: string[];
  interests: string[];
}

export interface Relationship {
  id: string;
  from: string;
  to: string;
  type: RelationType;
  weight?: number;
  at?: string;
}

export interface ReasonStep {
  label: string;
  kind: "user" | "product" | "category" | "brand" | "relation";
}

export interface Recommendation {
  productId: string;
  product: Product;
  score: number;
  bucket: "picked" | "because" | "setup" | "similar";
  reason: string;
  path: ReasonStep[];
}
