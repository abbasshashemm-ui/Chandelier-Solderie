import type { Product } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "mock-1",
    title: "Imperial Crystal Candelabra Chandelier",
    slug: "imperial-crystal-candelabra-chandelier",
    sku: "CS-IC-001",
    price: 875,
    style: "Classic",
    material: "Crystal",
    room: "Living Room",
    priceRange: "$500 – $1,000",
    dimensions: "Extra Large (over 120 cm)",
    shortDescription:
      "Twenty-four light candelabra chandelier with cascading crystal beads and faceted drops.",
    description:
      "A statement piece for grand living and dining rooms. Curved crystal arms, candle-style bulbs, and layered pendants create a warm, ballroom glow.",
    featured: true,
    imageUrl: "/products/1.png",
    imageAlt: "Large imperial crystal candelabra chandelier in a luxury living room",
  },
  {
    _id: "mock-2",
    title: "Heritage Tiered Crystal Chandelier",
    slug: "heritage-tiered-crystal-chandelier",
    sku: "CS-HT-002",
    price: 720,
    style: "Vintage",
    material: "Crystal",
    room: "Dining",
    priceRange: "$500 – $1,000",
    dimensions: "Large (80 – 120 cm)",
    shortDescription:
      "Multi-tier crystal chandelier with candelabra bulbs and teardrop pendants.",
    description:
      "Ornate tiers of faceted crystal and beaded strands, suited to formal dining rooms and spaces with character beams or high ceilings.",
    featured: true,
    imageUrl: "/products/2.png",
    imageAlt: "Heritage tiered crystal chandelier with warm candelabra lights",
  },
  {
    _id: "mock-3",
    title: "Regency Geometric Crystal Chandelier",
    slug: "regency-geometric-crystal-chandelier",
    sku: "CS-RG-003",
    price: 640,
    style: "Modern",
    material: "Crystal",
    room: "Living Room",
    priceRange: "$500 – $1,000",
    dimensions: "Large (80 – 120 cm)",
    shortDescription:
      "Gold geometric frame with stacked crystal tiers in a tapered conical form.",
    description:
      "Contemporary glamour for living rooms and open-plan spaces. Polished gold hardware and dense crystal drops deliver a refined focal point.",
    imageUrl: "/products/3.png",
    imageAlt: "Gold geometric tiered crystal chandelier above a living room sofa",
  },
  {
    _id: "mock-4",
    title: "Celestial Cascade Pendant Chandelier",
    slug: "celestial-cascade-pendant-chandelier",
    sku: "CS-CC-004",
    price: 790,
    style: "Modern",
    material: "Crystal",
    room: "Living Room",
    priceRange: "$500 – $1,000",
    dimensions: "Extra Large (over 120 cm)",
    shortDescription:
      "Faceted crystal drops suspended at varying heights with brushed gold caps.",
    description:
      "Designed for stairwells and double-height entries. Adjustable drop lengths create a waterfall of warm light through hand-cut crystal forms.",
    imageUrl: "/products/4.png",
    imageAlt: "Cascading faceted crystal pendant chandelier in a modern stairwell",
  },
  {
    _id: "mock-5",
    title: "Lumière Gold Flush Crystal Light",
    slug: "lumiere-gold-flush-crystal-light",
    sku: "CS-LF-005",
    price: 485,
    style: "Modern",
    material: "Crystal",
    room: "Living Room",
    priceRange: "Under $500",
    dimensions: "Medium (40 – 80 cm)",
    shortDescription:
      "Semi-flush gold fixture with rectangular prisms and faceted crystal sphere centre.",
    description:
      "Ideal for living rooms with generous ceiling height. Remote-dimmable LED core with warm white glow through layered crystal rings.",
    imageUrl: "/products/5.png",
    imageAlt: "Modern gold flush-mount crystal chandelier in a bright living room",
  },
  {
    _id: "mock-6",
    title: "Empire Gold & Crystal Chandelier",
    slug: "empire-gold-crystal-chandelier",
    sku: "CS-EG-006",
    price: 850,
    style: "Classic",
    material: "Crystal",
    room: "Dining",
    priceRange: "$500 – $1,000",
    dimensions: "Large (80 – 120 cm)",
    shortDescription:
      "Empire silhouette with gold lattice band and hand-strung crystal tiers.",
    description:
      "Traditional opulence for formal dining and reception rooms. Polished gold frame with dense faceted crystal beads and spherical bottom cluster.",
    featured: true,
    imageUrl: "/products/6.png",
    imageAlt: "Empire style gold and crystal tiered chandelier",
  },
  {
    _id: "mock-7",
    title: "Noir Cascade Ring Chandelier",
    slug: "noir-cascade-ring-chandelier",
    sku: "CS-NC-007",
    price: 560,
    style: "Modern",
    material: "Crystal",
    room: "Dining",
    priceRange: "$500 – $1,000",
    dimensions: "Large (80 – 120 cm)",
    shortDescription:
      "Seven-tier ring chandelier with vertical crystal prisms on a matte black frame.",
    description:
      "Contemporary inverted silhouette for dining rooms and lofts. Warm internal lighting refracts through densely packed faceted crystals.",
    imageUrl: "/products/7.png",
    imageAlt: "Black frame cascading crystal ring chandelier",
  },
  {
    _id: "mock-8",
    title: "Aurora Spiral LED Chandelier",
    slug: "aurora-spiral-led-chandelier",
    sku: "CS-AS-008",
    price: 395,
    style: "Modern",
    material: "Brass",
    room: "Living Room",
    priceRange: "Under $500",
    dimensions: "Medium (40 – 80 cm)",
    shortDescription:
      "Spiral gold LED rings with inset crystals for contemporary interiors.",
    description:
      "A sculptural spiral of illuminated gold rings, suited to modern living spaces and mezzanine levels. Integrated warm LED with subtle crystal sparkle.",
    imageUrl: "/products/8.png",
    imageAlt: "Spiral gold LED crystal chandelier in a modern white interior",
  },
];

export function getMockProductBySlug(slug: string): Product | null {
  return MOCK_PRODUCTS.find((product) => product.slug === slug) ?? null;
}
