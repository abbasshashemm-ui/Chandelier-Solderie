import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection",
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
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "includeSaleItems",
      title: "Include sale items",
      type: "boolean",
      description:
        "When enabled, every product flagged as Sale also appears in this collection.",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", media: "image", featured: "featured" },
    prepare: ({ title, media, featured }) => ({
      title,
      subtitle: featured ? "Featured" : undefined,
      media,
    }),
  },
});
