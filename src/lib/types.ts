import type { FormattedTextValue } from "./formatted-text";

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
  description?: FormattedTextValue;
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

export type InstagramPost = {
  _key: string;
  imageUrl: string;
  imageLqip?: string;
  imageAlt?: string;
  url?: string;
  caption?: string;
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
    posts?: InstagramPost[];
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
