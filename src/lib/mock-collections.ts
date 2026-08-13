import type { Collection } from "./types";

export const MOCK_COLLECTIONS: Collection[] = [
  {
    _id: "collection-super-sale",
    title: "Super Sale",
    slug: "super-sale",
    description:
      "Selected pieces with up to 50% off — limited seasonal reductions from the atelier.",
    imageUrl: "/products/2.png",
    imageAlt: "Super Sale collection",
    featured: true,
    includeSaleItems: true,
    sortOrder: 0,
  },
  {
    _id: "collection-chandeliers",
    title: "Chandeliers",
    slug: "chandeliers",
    description:
      "Crystal, brass and sculptural centrepieces for rooms that deserve a signature light.",
    imageUrl: "/products/1.png",
    imageAlt: "Chandelier collection",
    featured: true,
    sortOrder: 1,
  },
  {
    _id: "collection-pendants",
    title: "Pendants",
    slug: "pendants",
    description:
      "Cascading columns and gallery-scale pendants for voids, stairs and dining.",
    imageUrl: "/products/6.png",
    imageAlt: "Pendant collection",
    featured: true,
    sortOrder: 2,
  },
];
