import { imageFor } from "./images";
import type { Brand, Category, Product, Relationship, User } from "./types";

/**
 * Mock dataset used while the FastAPI + graph backend is being built.
 * Shapes intentionally mirror the planned API responses so services can be
 * swapped from mock -> fetch() without touching components.
 */

export const categories: Category[] = [
  { id: "cat-laptops", name: "Laptops", slug: "laptops" },
  { id: "cat-smartphones", name: "Smartphones", slug: "smartphones" },
  { id: "cat-audio", name: "Audio", slug: "audio" },
  { id: "cat-accessories", name: "Accessories", slug: "accessories" },
  { id: "cat-monitors", name: "Monitors", slug: "monitors" },
  { id: "cat-wearables", name: "Wearables", slug: "wearables" },
  { id: "cat-tablets", name: "Tablets", slug: "tablets" },
  { id: "cat-power", name: "Power & Charging", slug: "power" },
];

export const brands: Brand[] = [
  { id: "brand-lenovo", name: "Lenovo" },
  { id: "brand-apple", name: "Apple" },
  { id: "brand-samsung", name: "Samsung" },
  { id: "brand-sony", name: "Sony" },
  { id: "brand-logitech", name: "Logitech" },
  { id: "brand-keychron", name: "Keychron" },
  { id: "brand-dell", name: "Dell" },
  { id: "brand-anker", name: "Anker" },
];

const featureLibrary: Record<string, string[]> = {
  laptop: [
    "14-inch anti-glare display",
    "16GB RAM, 512GB SSD",
    "Backlit keyboard",
    "Up to 11 hours battery",
  ],
  smartphone: [
    "6.5-inch AMOLED display",
    "Triple camera system",
    "5G ready",
    "All-day battery",
  ],
  headphones: [
    "Active noise cancellation",
    "30 hour playback",
    "Memory foam ear cushions",
    "Multipoint Bluetooth",
  ],
  earbuds: ["Compact charging case", "Sweat resistant", "Touch controls", "Low-latency mode"],
  mouse: ["Silent click switches", "8000 DPI sensor", "USB-C fast charge", "Multi-device pairing"],
  keyboard: ["Hot-swappable switches", "Aluminium frame", "Wireless + wired", "Mac & Windows keys"],
  monitor: ["QHD resolution", "99% sRGB coverage", "Height adjustable stand", "USB-C single cable"],
  "laptop-stand": [
    "Anodised aluminium",
    "Raises screen to eye level",
    "Silicone grip pads",
    "Folds flat for travel",
  ],
  "usb-hub": ["7-in-1 ports", "4K HDMI output", "100W pass-through charging", "SD card reader"],
  smartwatch: ["Always-on display", "Heart rate & SpO2", "Sleep tracking", "5ATM water resistant"],
  tablet: ["11-inch laminated display", "Stylus support", "Quad speakers", "Keyboard cover ready"],
  charger: ["65W GaN charging", "Dual USB-C ports", "Foldable plug", "Braided cable included"],
};

const descriptions: Record<string, string> = {
  laptop: "A thin, quiet everyday laptop built for long work sessions, travel and study.",
  smartphone: "A balanced flagship with a bright display, dependable cameras and fast charging.",
  headphones: "Over-ear headphones tuned for calm focus, with deep noise cancellation.",
  earbuds: "Pocketable earbuds for commutes, calls and workouts.",
  mouse: "A quiet, comfortable pointer designed for full days at a desk.",
  keyboard: "A compact mechanical keyboard with a satisfying, low-noise typing feel.",
  monitor: "A colour-accurate desk monitor that connects with a single cable.",
  "laptop-stand": "Lifts your laptop to eye level and improves airflow at the same time.",
  "usb-hub": "Turns one USB-C port into everything your desk actually needs.",
  smartwatch: "Daily health tracking and notifications in a light, comfortable case.",
  tablet: "A big-screen companion for reading, sketching and second-screen work.",
  charger: "One compact adapter that charges your laptop, phone and earbuds.",
};

type Row = [
  id: string,
  name: string,
  brandId: string,
  categoryId: string,
  price: number,
  rating: number,
  reviews: number,
  kind: string,
  popularity: number,
];

const rows: Row[] = [
  ["p-1", "Lenovo IdeaPad Slim 5", "brand-lenovo", "cat-laptops", 58990, 4.4, 1284, "laptop", 96],
  ["p-2", "Lenovo ThinkBook 14", "brand-lenovo", "cat-laptops", 72990, 4.5, 642, "laptop", 88],
  ["p-3", "Apple MacBook Air 13", "brand-apple", "cat-laptops", 99900, 4.8, 2310, "laptop", 99],
  ["p-4", "Dell Inspiron 14 Plus", "brand-dell", "cat-laptops", 66490, 4.2, 512, "laptop", 74],
  ["p-5", "Samsung Galaxy Book4", "brand-samsung", "cat-laptops", 74990, 4.3, 388, "laptop", 70],
  ["p-6", "Lenovo Yoga Slim 7i", "brand-lenovo", "cat-laptops", 89990, 4.6, 431, "laptop", 79],
  ["p-7", "Apple iPhone 15", "brand-apple", "cat-smartphones", 74900, 4.7, 5120, "smartphone", 98],
  ["p-8", "Apple iPhone 15 Pro", "brand-apple", "cat-smartphones", 134900, 4.8, 3980, "smartphone", 95],
  ["p-9", "Samsung Galaxy S24", "brand-samsung", "cat-smartphones", 79999, 4.6, 4410, "smartphone", 94],
  ["p-10", "Samsung Galaxy S24 Ultra", "brand-samsung", "cat-smartphones", 129999, 4.7, 2870, "smartphone", 90],
  ["p-11", "Samsung Galaxy A55", "brand-samsung", "cat-smartphones", 39999, 4.3, 3211, "smartphone", 85],
  ["p-12", "Sony Xperia 10 VI", "brand-sony", "cat-smartphones", 44990, 4.1, 640, "smartphone", 58],
  ["p-13", "Sony WH-1000XM5 Headphones", "brand-sony", "cat-audio", 29990, 4.8, 6120, "headphones", 97],
  ["p-14", "Sony WH-CH720N Headphones", "brand-sony", "cat-audio", 9990, 4.4, 2140, "headphones", 82],
  ["p-15", "Apple AirPods Pro", "brand-apple", "cat-audio", 24900, 4.7, 7320, "earbuds", 96],
  ["p-16", "Samsung Galaxy Buds3", "brand-samsung", "cat-audio", 14999, 4.3, 1840, "earbuds", 78],
  ["p-17", "Sony WF-C710N Earbuds", "brand-sony", "cat-audio", 11990, 4.4, 1120, "earbuds", 72],
  ["p-18", "Anker Soundcore Life Q35", "brand-anker", "cat-audio", 8499, 4.2, 980, "headphones", 66],
  ["p-19", "Logitech MX Master 3S Mouse", "brand-logitech", "cat-accessories", 8995, 4.8, 4210, "mouse", 97],
  ["p-20", "Logitech MX Anywhere 3S", "brand-logitech", "cat-accessories", 7495, 4.6, 1620, "mouse", 84],
  ["p-21", "Logitech Signature M650 Mouse", "brand-logitech", "cat-accessories", 2495, 4.5, 3820, "mouse", 88],
  ["p-22", "Logitech Lift Vertical Mouse", "brand-logitech", "cat-accessories", 6995, 4.4, 740, "mouse", 62],
  ["p-23", "Keychron K2 Pro Keyboard", "brand-keychron", "cat-accessories", 9499, 4.7, 1290, "keyboard", 90],
  ["p-24", "Keychron K8 Wireless Keyboard", "brand-keychron", "cat-accessories", 8299, 4.5, 860, "keyboard", 76],
  ["p-25", "Keychron Q1 Pro Keyboard", "brand-keychron", "cat-accessories", 17999, 4.8, 420, "keyboard", 68],
  ["p-26", "Logitech MX Keys S", "brand-logitech", "cat-accessories", 10495, 4.6, 1510, "keyboard", 80],
  ["p-27", "Dell UltraSharp U2724D Monitor", "brand-dell", "cat-monitors", 42990, 4.7, 910, "monitor", 87],
  ["p-28", "Dell S2722DC Monitor", "brand-dell", "cat-monitors", 28990, 4.5, 1240, "monitor", 83],
  ["p-29", "Samsung ViewFinity S6 Monitor", "brand-samsung", "cat-monitors", 31990, 4.4, 560, "monitor", 71],
  ["p-30", "Dell P2425H Monitor", "brand-dell", "cat-monitors", 17990, 4.3, 1480, "monitor", 75],
  ["p-31", "Anker Aluminium Laptop Stand", "brand-anker", "cat-accessories", 2999, 4.6, 2210, "laptop-stand", 92],
  ["p-32", "Lenovo Portable Laptop Stand", "brand-lenovo", "cat-accessories", 2199, 4.3, 640, "laptop-stand", 70],
  ["p-33", "Logitech Riser Laptop Stand", "brand-logitech", "cat-accessories", 3499, 4.4, 410, "laptop-stand", 64],
  ["p-34", "Anker 7-in-1 USB-C Hub", "brand-anker", "cat-accessories", 4499, 4.6, 3120, "usb-hub", 93],
  ["p-35", "Anker 341 USB-C Hub", "brand-anker", "cat-accessories", 2999, 4.4, 1720, "usb-hub", 81],
  ["p-36", "Dell DA310 USB-C Adapter", "brand-dell", "cat-accessories", 7999, 4.3, 380, "usb-hub", 59],
  ["p-37", "Apple Watch Series 9", "brand-apple", "cat-wearables", 41900, 4.7, 2640, "smartwatch", 95],
  ["p-38", "Apple Watch SE", "brand-apple", "cat-wearables", 29900, 4.5, 1980, "smartwatch", 86],
  ["p-39", "Samsung Galaxy Watch7", "brand-samsung", "cat-wearables", 32999, 4.4, 1210, "smartwatch", 82],
  ["p-40", "Samsung Galaxy Fit3", "brand-samsung", "cat-wearables", 6999, 4.2, 1640, "smartwatch", 68],
  ["p-41", "Samsung Galaxy Tab S9", "brand-samsung", "cat-tablets", 72999, 4.6, 940, "tablet", 88],
  ["p-42", "Samsung Galaxy Tab A9+", "brand-samsung", "cat-tablets", 19999, 4.3, 2310, "tablet", 79],
  ["p-43", "Apple iPad Air 11", "brand-apple", "cat-tablets", 59900, 4.8, 1720, "tablet", 92],
  ["p-44", "Apple iPad 10th Gen", "brand-apple", "cat-tablets", 34900, 4.6, 2840, "tablet", 85],
  ["p-45", "Lenovo Tab P12", "brand-lenovo", "cat-tablets", 32999, 4.2, 520, "tablet", 61],
  ["p-46", "Anker 65W GaN Charger", "brand-anker", "cat-power", 2799, 4.7, 5210, "charger", 94],
  ["p-47", "Anker 100W Dual Charger", "brand-anker", "cat-power", 4299, 4.6, 2140, "charger", 84],
  ["p-48", "Apple 35W Dual USB-C Charger", "brand-apple", "cat-power", 5900, 4.5, 1180, "charger", 76],
  ["p-49", "Samsung 45W Travel Charger", "brand-samsung", "cat-power", 3499, 4.3, 890, "charger", 69],
  ["p-50", "Lenovo 65W USB-C Charger", "brand-lenovo", "cat-power", 3299, 4.2, 460, "charger", 63],
];

export const products: Product[] = rows.map(
  ([id, name, brandId, categoryId, price, rating, reviews, kind, popularity]) => ({
    id,
    name,
    brandId,
    categoryId,
    price,
    rating,
    reviews,
    kind,
    popularity,
    image: imageFor(kind),
    description: descriptions[kind] ?? "A well-made everyday product.",
    features: featureLibrary[kind] ?? [],
  }),
);

const firstNames = [
  "Vaishnavi",
  "Aarav",
  "Meera",
  "Rohan",
  "Ishita",
  "Kabir",
  "Ananya",
  "Dev",
  "Sara",
  "Nikhil",
  "Tara",
  "Arjun",
  "Diya",
  "Vikram",
  "Riya",
  "Aditya",
  "Neha",
  "Manav",
  "Kavya",
  "Rahul",
];

export const users: User[] = firstNames.map((name, i) => ({
  id: `u-${i + 1}`,
  name: `${name} ${["Kudukala", "Sharma", "Iyer", "Nair", "Kapoor"][i % 5]}`,
  email: `${name.toLowerCase()}@shopgraph.app`,
  avatarInitials: name.slice(0, 2).toUpperCase(),
  favoriteCategories:
    i === 0
      ? ["cat-laptops", "cat-accessories", "cat-audio"]
      : [categories[i % categories.length]!.id, categories[(i + 3) % categories.length]!.id],
  favoriteBrands:
    i === 0
      ? ["brand-lenovo", "brand-logitech", "brand-sony"]
      : [brands[i % brands.length]!.id, brands[(i + 2) % brands.length]!.id],
  interests:
    i === 0
      ? ["Work from home desk setups", "Quiet mechanical keyboards", "Noise cancelling audio"]
      : ["Everyday tech", "Value for money", "Premium build"],
}));

export const CURRENT_USER_ID = "u-1";

/** Graph edges. from/to are node ids: user ids, product ids, category ids or brand ids. */
export const relationships: Relationship[] = [
  // Current user activity
  { id: "r-1", from: "u-1", to: "p-1", type: "PURCHASED", at: "2026-07-28" },
  { id: "r-2", from: "u-1", to: "p-13", type: "PURCHASED", at: "2026-07-12" },
  { id: "r-3", from: "u-1", to: "p-46", type: "PURCHASED", at: "2026-06-30" },
  { id: "r-4", from: "u-1", to: "p-21", type: "PURCHASED", at: "2026-06-14" },
  { id: "r-5", from: "u-1", to: "p-9", type: "PURCHASED", at: "2026-05-22" },
  { id: "r-6", from: "u-1", to: "p-42", type: "PURCHASED", at: "2026-04-18" },
  { id: "r-7", from: "u-1", to: "p-34", type: "PURCHASED", at: "2026-03-09" },
  { id: "r-8", from: "u-1", to: "p-15", type: "PURCHASED", at: "2026-02-02" },
  { id: "r-9", from: "u-1", to: "p-19", type: "VIEWED", at: "2026-08-13" },
  { id: "r-10", from: "u-1", to: "p-23", type: "VIEWED", at: "2026-08-13" },
  { id: "r-11", from: "u-1", to: "p-31", type: "VIEWED", at: "2026-08-12" },
  { id: "r-12", from: "u-1", to: "p-27", type: "VIEWED", at: "2026-08-12" },
  { id: "r-13", from: "u-1", to: "p-3", type: "VIEWED", at: "2026-08-11" },
  { id: "r-14", from: "u-1", to: "p-37", type: "VIEWED", at: "2026-08-10" },
  { id: "r-15", from: "u-1", to: "p-26", type: "VIEWED", at: "2026-08-09" },
  { id: "r-16", from: "u-1", to: "p-41", type: "VIEWED", at: "2026-08-08" },
  { id: "r-17", from: "u-1", to: "p-14", type: "VIEWED", at: "2026-08-07" },
  { id: "r-18", from: "u-1", to: "p-30", type: "VIEWED", at: "2026-08-06" },
  { id: "r-19", from: "u-1", to: "p-2", type: "VIEWED", at: "2026-08-05" },
  { id: "r-20", from: "u-1", to: "p-35", type: "VIEWED", at: "2026-08-04" },
  { id: "r-21", from: "u-1", to: "p-43", type: "VIEWED", at: "2026-08-03" },
  { id: "r-22", from: "u-1", to: "p-47", type: "VIEWED", at: "2026-08-02" },
  { id: "r-23", from: "u-1", to: "p-25", type: "VIEWED", at: "2026-08-01" },
  { id: "r-24", from: "u-1", to: "p-19", type: "LIKED", at: "2026-08-13" },
  { id: "r-25", from: "u-1", to: "p-23", type: "LIKED", at: "2026-08-12" },
  { id: "r-26", from: "u-1", to: "p-31", type: "LIKED", at: "2026-08-12" },
  { id: "r-27", from: "u-1", to: "p-27", type: "LIKED", at: "2026-08-11" },
  { id: "r-28", from: "u-1", to: "p-3", type: "LIKED", at: "2026-08-10" },
  { id: "r-29", from: "u-1", to: "p-13", type: "LIKED", at: "2026-07-12" },

  // Similar products
  { id: "s-1", from: "p-1", to: "p-4", type: "SIMILAR_TO", weight: 0.91 },
  { id: "s-2", from: "p-1", to: "p-2", type: "SIMILAR_TO", weight: 0.88 },
  { id: "s-3", from: "p-1", to: "p-5", type: "SIMILAR_TO", weight: 0.84 },
  { id: "s-4", from: "p-13", to: "p-14", type: "SIMILAR_TO", weight: 0.9 },
  { id: "s-5", from: "p-13", to: "p-18", type: "SIMILAR_TO", weight: 0.79 },
  { id: "s-6", from: "p-19", to: "p-20", type: "SIMILAR_TO", weight: 0.93 },
  { id: "s-7", from: "p-23", to: "p-24", type: "SIMILAR_TO", weight: 0.92 },
  { id: "s-8", from: "p-9", to: "p-10", type: "SIMILAR_TO", weight: 0.9 },
  { id: "s-9", from: "p-42", to: "p-41", type: "SIMILAR_TO", weight: 0.86 },
  { id: "s-10", from: "p-46", to: "p-47", type: "SIMILAR_TO", weight: 0.89 },

  // Complementary products
  { id: "c-1", from: "p-1", to: "p-19", type: "COMPLEMENTARY_TO", weight: 0.94 },
  { id: "c-2", from: "p-1", to: "p-23", type: "COMPLEMENTARY_TO", weight: 0.9 },
  { id: "c-3", from: "p-1", to: "p-31", type: "COMPLEMENTARY_TO", weight: 0.92 },
  { id: "c-4", from: "p-1", to: "p-34", type: "COMPLEMENTARY_TO", weight: 0.88 },
  { id: "c-5", from: "p-1", to: "p-27", type: "COMPLEMENTARY_TO", weight: 0.85 },
  { id: "c-6", from: "p-1", to: "p-50", type: "COMPLEMENTARY_TO", weight: 0.8 },
  { id: "c-7", from: "p-3", to: "p-19", type: "COMPLEMENTARY_TO", weight: 0.9 },
  { id: "c-8", from: "p-9", to: "p-49", type: "COMPLEMENTARY_TO", weight: 0.82 },
  { id: "c-9", from: "p-13", to: "p-46", type: "COMPLEMENTARY_TO", weight: 0.71 },
  { id: "c-10", from: "p-41", to: "p-26", type: "COMPLEMENTARY_TO", weight: 0.74 },

  // Other customers also bought
  { id: "a-1", from: "p-1", to: "p-21", type: "ALSO_BOUGHT", weight: 0.87 },
  { id: "a-2", from: "p-1", to: "p-46", type: "ALSO_BOUGHT", weight: 0.83 },
  { id: "a-3", from: "p-13", to: "p-15", type: "ALSO_BOUGHT", weight: 0.8 },
  { id: "a-4", from: "p-9", to: "p-39", type: "ALSO_BOUGHT", weight: 0.78 },
  { id: "a-5", from: "p-19", to: "p-23", type: "ALSO_BOUGHT", weight: 0.86 },
];

/** Purchases by other users, used for "customers also bought" style reasoning. */
export const otherUserPurchases: Relationship[] = users.slice(1).flatMap((user, i) => [
  {
    id: `op-${i}-a`,
    from: user.id,
    to: products[(i * 3) % products.length]!.id,
    type: "PURCHASED" as const,
  },
  {
    id: `op-${i}-b`,
    from: user.id,
    to: products[(i * 7 + 5) % products.length]!.id,
    type: "PURCHASED" as const,
  },
]);

export const brandById = (id: string) => brands.find((b) => b.id === id);
export const categoryById = (id: string) => categories.find((c) => c.id === id);
export const productById = (id: string) => products.find((p) => p.id === id);
export const brandName = (id: string) => brandById(id)?.name ?? "Unknown brand";
export const categoryName = (id: string) => categoryById(id)?.name ?? "Uncategorised";
