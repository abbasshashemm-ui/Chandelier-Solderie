/**
 * Upsert the catalogue products (and images) into Sanity.
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
const COLLECTIONS = [
  {
    _id: "collection.chandeliers",
    title: "Chandeliers",
    slug: "chandeliers",
    description:
      "Crystal, brass and sculptural centrepieces for rooms that deserve a signature light.",
    featured: true,
    sortOrder: 1,
    imageFile: "1.png",
    imageAlt: "Chandelier collection",
  },
  {
    _id: "collection.pendants",
    title: "Pendants",
    slug: "pendants",
    description:
      "Cascading columns and gallery-scale pendants for voids, stairs and dining.",
    featured: true,
    sortOrder: 2,
    imageFile: "6.png",
    imageAlt: "Pendant collection",
  },
];

/** @type {Array<Record<string, unknown>>} */
const PRODUCTS = [
  {
    _id: "product.volare-crystal-feather-cascade",
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
    collectionId: "collection.chandeliers",
    shortDescription:
      "Hand-formed crystal feathers suspended on invisible wires in a swirling descent.",
    description:
      "An architectural statement for double-height entries and grand living rooms. Translucent feather elements cascade from a circular canopy, denser at the crown and tapering to a whisper of light below. Integrated illumination travels through each crystal plume for an ethereal glow.",
    featured: true,
    imageFile: "1.png",
    imageAlt: "Cascading crystal feather chandelier against a dark background",
  },
  {
    _id: "product.papillon-iridescent-cascade",
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
    collectionId: "collection.chandeliers",
    shortDescription:
      "Crystal bead strands with iridescent butterflies spiraling through the fall of light.",
    description:
      "Hundreds of fine crystal strands hang from a polished chrome flush canopy. Faceted iridescent butterflies weave a descending spiral, catching pale blues, pinks, and golds — a kinetic, showroom-ready centrepiece for living spaces and galleries.",
    featured: true,
    imageFile: "2.png",
    imageAlt: "Crystal cascade chandelier with iridescent butterflies",
  },
  {
    _id: "product.regence-grand-crystal-chandelier",
    title: "Régence Grand Crystal Chandelier",
    slug: "regence-grand-crystal-chandelier",
    sku: "CS-RG-003",
    price: 1650,
    style: "Classic",
    material: "Crystal",
    room: "Dining",
    dimensions: "Large (80 – 120 cm)",
    category: "Chandeliers",
    collectionId: "collection.chandeliers",
    shortDescription:
      "Multi-tier classic crystal with candle arms, bobeches, and prismatic pendalogues.",
    description:
      "Traditional opulence for formal dining and reception rooms. Curved crystal arms carry candle-style bulbs above scalloped bobeches, while teardrop and almond pendants scatter warm prismatic light. A faceted crystal ball finishes the stem.",
    featured: true,
    imageFile: "3.png",
    imageAlt: "Ornate multi-tier classic crystal chandelier with candle bulbs",
  },
  {
    _id: "product.aurum-shard-cascade",
    title: "Aurum Shard Cascade",
    slug: "aurum-shard-cascade",
    sku: "CS-AS-004",
    price: 3100,
    style: "Modern",
    material: "Glass",
    room: "Living Room",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    collectionId: "collection.chandeliers",
    shortDescription:
      "Inverted cone of textured clear glass and polished gold shards under a mirrored canopy.",
    description:
      "Dramatic contemporary form for loft volumes and feature voids. Long triangular shards in cracked-ice clear glass and mirror-polished gold hang from a circular canopy with recessed spotlights, tapering to a single point of brilliance.",
    featured: false,
    imageFile: "4.png",
    imageAlt: "Gold and clear glass shard cascade chandelier",
  },
  {
    _id: "product.aether-gold-plume-installation",
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
    collectionId: "collection.chandeliers",
    shortDescription:
      "Sculptural flock of gold and frosted glass plumes suspended on invisible cables.",
    description:
      "A sweeping installation of metallic gold and frosted white plume elements, arranged like wind-caught flight through a dark paneled room. Ideal for double-height living rooms seeking a nocturne, gallery-scale centrepiece.",
    featured: true,
    imageFile: "5.png",
    imageAlt: "Gold and white plume sculptural chandelier in a dark interior",
  },
  {
    _id: "product.rubis-rain-column",
    title: "Rubis Rain Column",
    slug: "rubis-rain-column",
    sku: "CS-RR-006",
    price: 3800,
    style: "Modern",
    material: "Glass",
    room: "Living Room",
    dimensions: "Extra Large (over 120 cm)",
    category: "Pendants",
    collectionId: "collection.pendants",
    shortDescription:
      "Floor-near rain column of burgundy-to-clear handcrafted glass on invisible wires.",
    description:
      "A cylindrical cascade for lobbies, stair voids, and gallery corridors. Deep plum and burgundy glass crowns the column, dissolving into clear fragments below. A recessed ceiling spot casts a soft rose glow through the upper register.",
    featured: false,
    imageFile: "6.png",
    imageAlt: "Burgundy-to-clear cascading glass rain column chandelier",
  },
  {
    _id: "product.helix-leaf-spiral",
    title: "Helix Leaf Spiral",
    slug: "helix-leaf-spiral",
    sku: "CS-HL-007",
    price: 2450,
    style: "Modern",
    material: "Brass",
    room: "Dining",
    dimensions: "Extra Large (over 120 cm)",
    category: "Chandeliers",
    collectionId: "collection.chandeliers",
    shortDescription:
      "Double-helix of rippled clear glass and polished gold leaves from a white canopy.",
    description:
      "Nature-inspired contemporary spiral for dining rooms and atriums. Organic leaf forms in water-textured clear glass and warm polished gold descend from a circular white canopy with integrated spotlights, ending in a single gilded tip.",
    featured: false,
    imageFile: "7.png",
    imageAlt: "Gold and clear glass leaf spiral cascade chandelier",
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
  console.log(
    `Seeding ${COLLECTIONS.length} collections and ${PRODUCTS.length} products → ${projectId}/${dataset}`,
  );

  for (const collection of COLLECTIONS) {
    const { _id, slug, imageFile, imageAlt, featured, ...fields } = collection;
    process.stdout.write(`  • Collection: ${fields.title}… `);
    const image = await uploadImage(imageFile, imageAlt);

    await client.createOrReplace({
      _id,
      _type: "collection",
      ...fields,
      slug: { _type: "slug", current: slug },
      featured: Boolean(featured),
      image,
    });

    console.log("ok");
  }

  for (const product of PRODUCTS) {
    const {
      _id,
      slug,
      imageFile,
      imageAlt,
      featured,
      collectionId,
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
      onSale: Boolean(fields.onSale),
      mainImage,
      collection: collectionId
        ? { _type: "reference", _ref: collectionId }
        : undefined,
      publishedAt: new Date().toISOString(),
    });

    console.log("ok");
  }

  console.log("Done. Open Studio → Collections / Products to review.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
