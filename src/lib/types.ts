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
  style?: string;
  material?: string;
  room?: string;
  priceRange?: string;
  dimensions?: string;
  shortDescription?: string;
  description?: string;
  featured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  galleryUrls?: string[];
  publishedAt?: string;
};

export type FilterOption = {
  key: FilterKey;
  label: string;
  values: string[];
};

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
    values: [
      "Under $500",
      "$500 – $1,000",
      "$1,000 – $2,500",
      "$2,500 – $5,000",
      "Over $5,000",
    ],
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
