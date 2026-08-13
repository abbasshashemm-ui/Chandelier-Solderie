import { defineField, defineType } from "sanity";
import { AutoSlugInput, HiddenSlugField } from "../../src/sanity/auto-slug-input";

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
      hidden: false,
      options: {
        source: "title",
        maxLength: 96,
        isUnique: () => true,
      },
      components: {
        field: HiddenSlugField,
        input: AutoSlugInput,
      },
    }),
    defineField({ name: "sku", title: "SKU", type: "string" }),
    defineField({ name: "price", title: "Price (USD)", type: "number" }),
    defineField({
      name: "compareAtPrice",
      title: "Original price (USD)",
      type: "number",
      description:
        "Optional before-sale price. Shown crossed out next to the current price.",
    }),
    defineField({
      name: "onSale",
      title: "Sale",
      type: "boolean",
      description:
        "Flag this piece as on sale. The discount percentage appears on collection cards.",
      initialValue: false,
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      description: "First picture — used as the listing preview.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "video",
      title: "Product Video",
      type: "file",
      options: {
        accept: "video/*",
      },
      description:
        "Optional. The listing still shows the main image; this video autoplays when the product page opens.",
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      description: "e.g. Classic, Industrial, Modern, Vintage",
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      description: "e.g. Brass, Crystal, Glass, Rattan",
    }),
    defineField({
      name: "room",
      title: "Room",
      type: "string",
      description: "e.g. Living Room, Dining, Bedroom",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions / Size",
      type: "string",
      description:
        "e.g. Small (under 40 cm), Medium (40 – 80 cm), Large (80 – 120 cm), Extra Large (over 120 cm)",
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
      name: "category",
      title: "Category",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "featured",
      title: "Signature piece",
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
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "sku",
      onSale: "onSale",
    },
    prepare: ({ title, media, subtitle, onSale }) => ({
      title,
      subtitle: onSale ? `${subtitle ?? ""} · Sale`.trim() : subtitle,
      media,
    }),
  },
});
