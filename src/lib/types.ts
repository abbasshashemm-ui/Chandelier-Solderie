export type FilterKey =
  | "style"
  | "material"
  | "room"
  | "priceRange"
  | "dimensions";

export type Product = {
  _id: string;
  title: string;
  slug: string;
  sku?: string;
  price?: number;
  compareAtPrice?: number;
  onSale?: boolean;
  style?: string;
  material?: string;
  room?: string;
  priceRange?: string;
  dimensions?: string;
  category?: string;
  collectionSlug?: string;
  collectionTitle?: string;
  shortDescription?: string;
  description?: string;
  featured?: boolean;
  imageUrl?: string;
  imageLqip?: string;
  imageAlt?: string;
  galleryUrls?: string[];
  videoUrl?: string;
  publishedAt?: string;
};

export type Collection = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  imageLqip?: string;
  imageAlt?: string;
  featured?: boolean;
  sortOrder?: number;
  productCount?: number;
  includeSaleItems?: boolean;
  cardEyebrow?: string;
  promoRibbon?: {
    enabled?: boolean;
    kicker?: string;
    headline?: string;
  };
};

export type HomepagePromo = {
  href: string;
  kicker: string;
  headline: string;
};

export type FilterOption = {
  key: FilterKey;
  label: string;
  values: string[];
};

export const PRICE_RANGE_VALUES = [
  "Under $50",
  "$50 – $100",
  "$100 – $500",
  "Over $500",
] as const;
