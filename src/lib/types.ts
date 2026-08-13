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

export const FILTER_DEFINITIONS: FilterOption[] = [
  {
    key: "style",
    label: "Style",
    values: ["Classic", "Industrial", "Modern", "Vintage"],
  },
  {
    key: "material",
    label: "Material",
    values: ["Brass", "Crystal", "Glass", "Rattan"],
  },
  {
    key: "room",
    label: "Room",
    values: ["Bedroom", "Dining", "Living Room"],
  },
  {
    key: "priceRange",
    label: "Price Range",
    values: [...PRICE_RANGE_VALUES],
  },
  {
    key: "dimensions",
    label: "Dimensions / Size",
    values: [
      "Small (under 40 cm)",
      "Medium (40 – 80 cm)",
      "Large (80 – 120 cm)",
      "Extra Large (over 120 cm)",
    ],
  },
];
