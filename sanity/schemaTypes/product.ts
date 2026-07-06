import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "sku", title: "SKU", type: "string" }),
    defineField({ name: "price", title: "Price (USD)", type: "number" }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: ["Classic", "Industrial", "Modern", "Vintage"],
      },
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      options: {
        list: ["Brass", "Crystal", "Glass", "Rattan"],
      },
    }),
    defineField({
      name: "room",
      title: "Room",
      type: "string",
      options: {
        list: ["Living Room", "Dining", "Bedroom"],
      },
    }),
    defineField({
      name: "priceRange",
      title: "Price Range",
      type: "string",
      options: {
        list: [
          "Under $500",
          "$500 – $1,000",
          "$1,000 – $2,500",
          "$2,500 – $5,000",
          "Over $5,000",
        ],
      },
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions / Size",
      type: "string",
      options: {
        list: [
          "Small (under 40 cm)",
          "Medium (40 – 80 cm)",
          "Large (80 – 120 cm)",
          "Extra Large (over 120 cm)",
        ],
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "video",
      title: "Product Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Chandeliers",
          "Pendants",
          "Wall Lamps",
          "Flush Mounts",
          "Outdoor",
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "sku" },
  },
});
