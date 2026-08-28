import {
  getProductPrices,
  getSizeLabels,
  matchesPriceRange,
} from "./pricing";
import {
  PRICE_RANGE_VALUES,
  type FilterKey,
  type FilterOption,
  type Product,
} from "./types";

export type ActiveFilters = Partial<Record<FilterKey, string[]>>;

export const PRODUCTS_PER_PAGE = 24;

export const ROOM_FILTER_VALUES = [
  "Living Room",
  "Dining Room",
  "Bedroom",
  "Kitchen",
  "Foyer",
  "Staircase",
  "Hallway",
  "Office",
  "Study Room",
] as const;

export const SIZE_FILTER_VALUES = [
  "Under 20 cm",
  "20 - 40 cm",
  "40 - 60 cm",
  "60 - 80 cm",
  "Over 80 cm",
  "Customizable",
] as const;

const ATTRIBUTE_FILTERS: {
  key: Exclude<FilterKey, "priceRange">;
  label: string;
}[] = [
  { key: "style", label: "Style" },
  { key: "material", label: "Material" },
  { key: "room", label: "Room" },
  { key: "dimensions", label: "Dimensions / Size" },
];

function sizeInBucket(span: { min: number; max: number }, filter: string) {
  switch (filter) {
    case "Under 20 cm":
      return span.min < 20;
    case "20 - 40 cm":
      return span.max >= 20 && span.min < 40;
    case "40 - 60 cm":
      return span.max >= 40 && span.min < 60;
    case "60 - 80 cm":
      return span.max >= 60 && span.min <= 80;
    case "Over 80 cm":
      return span.max > 80;
    default:
      return false;
  }
}

function uniqueSorted(values: (string | undefined)[]) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))].sort(
    (a, b) => a.localeCompare(b),
  );
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function stripRoomSuffix(text: string) {
  return text.replace(/\broom\b/g, " ").replace(/\s+/g, " ").trim();
}

export function roomMatchesFilter(productRoom: string | undefined, filter: string) {
  if (!productRoom) return false;
  const filterNorm = normalize(filter);
  const filterCore = stripRoomSuffix(filterNorm);
  if (!filterNorm) return false;

  return productRoom.split(/[,;/|&]+/).some((part) => {
    const token = normalize(part);
    if (!token) return false;
    const tokenCore = stripRoomSuffix(token);
    if (token === filterNorm || tokenCore === filterCore) return true;
    if (filterCore && tokenCore && (tokenCore.includes(filterCore) || filterCore.includes(tokenCore))) {
      return true;
    }
    return token.includes(filterNorm) || filterNorm.includes(token);
  });
}

type SizeSpan = { min: number; max: number } | "custom";

function parseSizeSpan(label: string): SizeSpan | null {
  if (/custom/i.test(label)) return "custom";

  const numbers = [...label.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  if (numbers.length === 0) return null;

  const under = /\b(under|below|less)\b|<\s*\d/i.test(label);
  const over = /\b(over|above|more|greater)\b|\+\s*$/i.test(label);

  if (under) {
    return { min: 0, max: numbers[0] };
  }
  if (over) {
    return { min: numbers[0], max: Number.POSITIVE_INFINITY };
  }
  if (numbers.length >= 2) {
    return {
      min: Math.min(numbers[0], numbers[1]),
      max: Math.max(numbers[0], numbers[1]),
    };
  }
  return { min: numbers[0], max: numbers[0] };
}

export function sizeMatchesFilter(product: Product, filter: string) {
  const labels = getSizeLabels(product);
  if (filter === "Customizable") {
    return labels.some((label) => /custom/i.test(label));
  }

  return labels.some((label) => {
    const span = parseSizeSpan(label);
    if (!span || span === "custom") return false;
    return sizeInBucket(span, filter);
  });
}

function productMatchesFilter(product: Product, key: FilterKey, value: string) {
  if (key === "priceRange") {
    return getProductPrices(product).some((price) => matchesPriceRange(price, value));
  }
  if (key === "dimensions") {
    return sizeMatchesFilter(product, value);
  }
  if (key === "room") {
    return roomMatchesFilter(product.room, value);
  }
  return product[key] === value;
}

export function getFilterDefinitions(products: Product[]): FilterOption[] {
  const groups: FilterOption[] = ATTRIBUTE_FILTERS.map(({ key, label }) => {
    if (key === "room") {
      return { key, label, values: [...ROOM_FILTER_VALUES] };
    }
    if (key === "dimensions") {
      return { key, label, values: [...SIZE_FILTER_VALUES] };
    }
    return {
      key,
      label,
      values: uniqueSorted(products.map((product) => product[key])),
    };
  });

  if (products.some((product) => getProductPrices(product).length > 0)) {
    groups.splice(3, 0, {
      key: "priceRange",
      label: "Price Range",
      values: [...PRICE_RANGE_VALUES],
    });
  }

  return groups.filter((group) => group.values.length > 0);
}

export function filterProducts(
  products: Product[],
  filters: ActiveFilters,
  searchQuery = "",
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesFilters = (Object.entries(filters) as [FilterKey, string[]][]).every(
      ([key, values]) => {
        if (!values?.length) return true;
        return values.some((value) => productMatchesFilter(product, key, value));
      },
    );

    if (!matchesFilters) return false;
    if (!query) return true;

    const haystack = [
      product.title,
      product.sku,
      product.category,
      product.room,
      ...getSizeLabels(product),
      ...(product.sizes ?? []).map((size) => size.sku),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function countActiveFilters(filters: ActiveFilters) {
  return Object.values(filters).reduce((total, values) => total + (values?.length ?? 0), 0);
}

export function getProductMetaLine(product: Product) {
  const parts: string[] = [];
  if (product.publishedAt) {
    parts.push(new Date(product.publishedAt).getFullYear().toString());
  }
  if (product.style) {
    parts.push(product.style.toUpperCase());
  }
  return parts.join(" — ");
}
