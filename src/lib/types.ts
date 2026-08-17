export type FilterKey =
  | "style"
  | "material"
  | "room"
  | "priceRange"
  | "dimensions";

export type ProductSize = {
  _key: string;
  label: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  sku?: string;
  price?: number;
  compareAtPrice?: number;
  onSale?: boolean;
  sizes?: ProductSize[];
  style?: string;
  material?: string;
  room?: string;
  priceRange?: string;
  dimensions?: string;
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

export type ShowroomPhoto = {
  imageUrl: string;
  imageLqip?: string;
  imageAlt?: string;
};

export type SiteSettings = {
  showroom?: {
    heading?: string;
    body?: string;
    mapQuery?: string;
    photos?: ShowroomPhoto[];
  };
  instagram?: {
    heading?: string;
    body?: string;
  };
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
