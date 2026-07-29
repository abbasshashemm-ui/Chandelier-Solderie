/**
 * Upsert the 8 catalogue products (and images) into Sanity.
 *
 * Usage:
 *   SANITY_API_TOKEN=<editor-token> npm run seed:products
 *
 * Create a token at https://sanity.io/manage → project asa3yip9 → API → Tokens
 * (Editor or higher). Never commit the token.
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { basename, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "asa3yip9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN.\n" +
      "Create an Editor token at https://sanity.io/manage and run:\n" +
      "  SANITY_API_TOKEN=<token> npm run seed:products",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/** @type {Array<Record<string, unknown>>} */
const PRODUCTS = [
  {
    _id: "product.imperial-crystal-candelabra-chandelier",
    title: "Imperial Crystal Candelabra Chandelier",
    slug: "imperial-crystal-candelabra-chandelier",
    sku: "CS-IC-001",
    price: 875,
    style: "Classic",
    material: "Crystal",
    room: "Living Room",
    priceRange: "$500 – $1,000",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Twenty-four light candelabra chandelier with cascading crystal beads and faceted drops.",
    description:
      "A statement piece for grand living and dining rooms. Curved crystal arms, candle-style bulbs, and layered pendants create a warm, ballroom glow.",
    featured: true,
    imageFile: "1.png",
    imageAlt:
      "Large imperial crystal candelabra chandelier in a luxury living room",
  },
  {
    _id: "product.heritage-tiered-crystal-chandelier",
    title: "Heritage Tiered Crystal Chandelier",
    slug: "heritage-tiered-crystal-chandelier",
    sku: "CS-HT-002",
    price: 720,
    style: "Vintage",
    material: "Crystal",
    room: "Dining",
    priceRange: "$500 – $1,000",
    dimensions: "Large (80 – 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Multi-tier crystal chandelier with candelabra bulbs and teardrop pendants.",
    description:
      "Ornate tiers of faceted crystal and beaded strands, suited to formal dining rooms and spaces with character beams or high ceilings.",
    featured: true,
    imageFile: "2.png",
    imageAlt: "Heritage tiered crystal chandelier with warm candelabra lights",
  },
  {
    _id: "product.regency-geometric-crystal-chandelier",
    title: "Regency Geometric Crystal Chandelier",
    slug: "regency-geometric-crystal-chandelier",
    sku: "CS-RG-003",
    price: 640,
    style: "Modern",
    material: "Crystal",
    room: "Living Room",
    priceRange: "$500 – $1,000",
    dimensions: "Large (80 – 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Gold geometric frame with stacked crystal tiers in a tapered conical form.",
    description:
      "Contemporary glamour for living rooms and open-plan spaces. Polished gold hardware and dense crystal drops deliver a refined focal point.",
    featured: false,
    imageFile: "3.png",
    imageAlt: "Gold geometric tiered crystal chandelier above a living room sofa",
  },
  {
    _id: "product.celestial-cascade-pendant-chandelier",
    title: "Celestial Cascade Pendant Chandelier",
    slug: "celestial-cascade-pendant-chandelier",
    sku: "CS-CC-004",
    price: 790,
    style: "Modern",
    material: "Crystal",
    room: "Living Room",
    priceRange: "$500 – $1,000",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Faceted crystal drops suspended at varying heights with brushed gold caps.",
    description:
      "Designed for stairwells and double-height entries. Adjustable drop lengths create a waterfall of warm light through hand-cut crystal forms.",
    featured: false,
    imageFile: "4.png",
    imageAlt: "Cascading faceted crystal pendant chandelier in a modern stairwell",
  },
  {
    _id: "product.lumiere-gold-flush-crystal-light",
    title: "Lumière Gold Flush Crystal Light",
    slug: "lumiere-gold-flush-crystal-light",
    sku: "CS-LF-005",
    price: 485,
    style: "Modern",
    material: "Crystal",
    room: "Living Room",
    priceRange: "Under $500",
    dimensions: "Medium (40 – 80 cm)",
    category: "Flush Mounts",
    shortDescription:
      "Semi-flush gold fixture with rectangular prisms and faceted crystal sphere centre.",
    description:
      "Ideal for living rooms with generous ceiling height. Remote-dimmable LED core with warm white glow through layered crystal rings.",
    featured: false,
    imageFile: "5.png",
    imageAlt: "Modern gold flush-mount crystal chandelier in a bright living room",
  },
  {
    _id: "product.empire-gold-crystal-chandelier",
    title: "Empire Gold & Crystal Chandelier",
    slug: "empire-gold-crystal-chandelier",
    sku: "CS-EG-006",
    price: 850,
    style: "Classic",
    material: "Crystal",
    room: "Dining",
    priceRange: "$500 – $1,000",
    dimensions: "Large (80 – 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Empire silhouette with gold lattice band and hand-strung crystal tiers.",
    description:
      "Traditional opulence for formal dining and reception rooms. Polished gold frame with dense faceted crystal beads and spherical bottom cluster.",
    featured: true,
    imageFile: "6.png",
    imageAlt: "Empire style gold and crystal tiered chandelier",
  },
  {
    _id: "product.noir-cascade-ring-chandelier",
    title: "Noir Cascade Ring Chandelier",
    slug: "noir-cascade-ring-chandelier",
    sku: "CS-NC-007",
    price: 560,
    style: "Modern",
    material: "Crystal",
    room: "Dining",
    priceRange: "$500 – $1,000",
    dimensions: "Large (80 – 120 cm)",
    category: "Chandeliers",
    shortDescription:
      "Seven-tier ring chandelier with vertical crystal prisms on a matte black frame.",
    description:
      "Contemporary inverted silhouette for dining rooms and lofts. Warm internal lighting refracts through densely packed faceted crystals.",
    featured: false,
    imageFile: "7.png",
    imageAlt: "Black frame cascading crystal ring chandelier",
  },
  {
    _id: "product.aurora-spiral-led-chandelier",
    title: "Aurora Spiral LED Chandelier",
    slug: "aurora-spiral-led-chandelier",
    sku: "CS-AS-008",
    price: 395,
    style: "Modern",
    material: "Brass",
    room: "Living Room",
    priceRange: "Under $500",
    dimensions: "Medium (40 – 80 cm)",
    category: "Chandeliers",
    shortDescription:
      "Spiral gold LED rings with inset crystals for contemporary interiors.",
    description:
      "A sculptural spiral of illuminated gold rings, suited to modern living spaces and mezzanine levels. Integrated warm LED with subtle crystal sparkle.",
    featured: false,
    imageFile: "8.png",
    imageAlt: "Spiral gold LED crystal chandelier in a modern white interior",
  },
];

async function uploadImage(filename, alt) {
  const path = join(root, "public", "products", filename);
  if (!existsSync(path)) {
    throw new Error(`Missing image: ${path}`);
  }

  const asset = await client.assets.upload("image", createReadStream(path), {
    filename: basename(path),
    contentType: "image/jpeg",
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
    alt,
  };
}

async function seed() {
  console.log(`Seeding ${PRODUCTS.length} products → ${projectId}/${dataset}`);

  for (const product of PRODUCTS) {
    const {
      _id,
      slug,
      imageFile,
      imageAlt,
      featured,
      ...fields
    } = product;

    process.stdout.write(`  • ${fields.title}… `);
    const mainImage = await uploadImage(imageFile, imageAlt);

    await client.createOrReplace({
      _id,
      _type: "product",
      ...fields,
      slug: { _type: "slug", current: slug },
      featured: Boolean(featured),
      mainImage,
      publishedAt: new Date().toISOString(),
    });

    console.log("ok");
  }

  console.log("Done. Open Studio → Products to review.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
