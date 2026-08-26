import { slugify } from "./slug";
import type { Product } from "./types";

function withCollection(product: Product): Product {
  const collectionTitle = product.collectionTitle ?? product.category;
  const collectionSlug =
    product.collectionSlug ??
    (collectionTitle ? slugify(collectionTitle) : undefined);

  return { ...product, collectionTitle, collectionSlug };
}

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "mock-1",
    title: "Volare Crystal Feather Cascade",
    slug: "volare-crystal-feather-cascade",
    sku: "CS-VF-001",
    price: 2850,
    compareAtPrice: 5700,
    onSale: true,
    style: "Modern",
    material: "Crystal",
    room: "Living Room",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Hand-formed crystal feathers suspended on invisible wires in a swirling descent.",
    description:
      "An architectural statement for double-height entries and grand living rooms. Translucent feather elements cascade from a circular canopy, denser at the crown and tapering to a whisper of light below. Integrated illumination travels through each crystal plume for an ethereal glow.",
    featured: true,
    imageUrl: "/products/1.png",
    imageAlt: "Cascading crystal feather chandelier against a dark background",
    sizes: [
      { _key: "size-60", label: "60 cm", price: 250 },
      { _key: "size-80", label: "80 cm", price: 350 },
    ],
  },
  {
    _id: "mock-2",
    title: "Papillon Iridescent Cascade",
    slug: "papillon-iridescent-cascade",
    sku: "CS-PI-002",
    price: 2200,
    compareAtPrice: 3200,
    onSale: true,
    style: "Modern",
    material: "Crystal",
    room: "Living Room",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Crystal bead strands with iridescent butterflies spiraling through the fall of light.",
    description:
      "Hundreds of fine crystal strands hang from a polished chrome flush canopy. Faceted iridescent butterflies weave a descending spiral, catching pale blues, pinks, and golds — a kinetic, showroom-ready centrepiece for living spaces and galleries.",
    featured: true,
    imageUrl: "/products/2.png",
    imageAlt: "Crystal cascade chandelier with iridescent butterflies",
  },
  {
    _id: "mock-3",
    title: "Régence Grand Crystal Chandelier",
    slug: "regence-grand-crystal-chandelier",
    sku: "CS-RG-003",
    price: 1650,
    style: "Classic",
    material: "Crystal",
    room: "Dining",
    dimensions: "Large (80 – 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Multi-tier classic crystal with candle arms, bobeches, and prismatic pendalogues.",
    description:
      "Traditional opulence for formal dining and reception rooms. Curved crystal arms carry candle-style bulbs above scalloped bobeches, while teardrop and almond pendants scatter warm prismatic light. A faceted crystal ball finishes the stem.",
    featured: true,
    imageUrl: "/products/3.png",
    imageAlt: "Ornate multi-tier classic crystal chandelier with candle bulbs",
  },
  {
    _id: "mock-4",
    title: "Aurum Shard Cascade",
    slug: "aurum-shard-cascade",
    sku: "CS-AS-004",
    price: 3100,
    style: "Modern",
    material: "Glass",
    room: "Living Room",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Inverted cone of textured clear glass and polished gold shards under a mirrored canopy.",
    description:
      "Dramatic contemporary form for loft volumes and feature voids. Long triangular shards in cracked-ice clear glass and mirror-polished gold hang from a circular canopy with recessed spotlights, tapering to a single point of brilliance.",
    featured: false,
    imageUrl: "/products/4.png",
    imageAlt: "Gold and clear glass shard cascade chandelier",
  },
  {
    _id: "mock-5",
    title: "Aether Gold Plume Installation",
    slug: "aether-gold-plume-installation",
    sku: "CS-AP-005",
    price: 4200,
    compareAtPrice: 5600,
    onSale: true,
    style: "Modern",
    material: "Brass",
    room: "Living Room",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Sculptural flock of gold and frosted glass plumes suspended on invisible cables.",
    description:
      "A sweeping installation of metallic gold and frosted white plume elements, arranged like wind-caught flight through a dark paneled room. Ideal for double-height living rooms seeking a nocturne, gallery-scale centrepiece.",
    featured: true,
    imageUrl: "/products/5.png",
    imageAlt: "Gold and white plume sculptural chandelier in a dark interior",
  },
  {
    _id: "mock-6",
    title: "Rubis Rain Column",
    slug: "rubis-rain-column",
    sku: "CS-RR-006",
    price: 3800,
    style: "Modern",
    material: "Glass",
    room: "Living Room",
    dimensions: "Extra Large (over 120 cm)",
    category: "Pendants",
    shortDescription:
      "Floor-near rain column of burgundy-to-clear handcrafted glass on invisible wires.",
    description:
      "A cylindrical cascade for lobbies, stair voids, and gallery corridors. Deep plum and burgundy glass crowns the column, dissolving into clear fragments below. A recessed ceiling spot casts a soft rose glow through the upper register.",
    featured: false,
    imageUrl: "/products/6.png",
    imageAlt: "Burgundy-to-clear cascading glass rain column chandelier",
  },
  {
    _id: "mock-7",
    title: "Helix Leaf Spiral",
    slug: "helix-leaf-spiral",
    sku: "CS-HL-007",
    price: 2450,
    style: "Modern",
    material: "Brass",
    room: "Dining",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Double-helix of rippled clear glass and polished gold leaves from a white canopy.",
    description:
      "Nature-inspired contemporary spiral for dining rooms and atriums. Organic leaf forms in water-textured clear glass and warm polished gold descend from a circular white canopy with integrated spotlights, ending in a single gilded tip.",
    featured: false,
    imageUrl: "/products/7.png",
    imageAlt: "Gold and clear glass leaf spiral cascade chandelier",
  },
].map(withCollection);

export function getMockProductBySlug(slug: string): Product | null {
  return MOCK_PRODUCTS.find((product) => product.slug === slug) ?? null;
}
