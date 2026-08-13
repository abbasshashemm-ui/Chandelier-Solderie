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
      name: "cardEyebrow",
      title: "Card eyebrow",
      type: "string",
      description:
        'Small label on homepage collection cards. Defaults to “Limited offering” when the collection includes sale items, otherwise “Collection”.',
    }),
    defineField({
      name: "promoRibbon",
      title: "Homepage sale ribbon",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Show on homepage",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "kicker",
          title: "Kicker",
          type: "string",
          description: "Small line above the headline. Defaults to the collection title.",
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description:
            "Leave blank to show “Up to {max sale %} OFF” from products in this collection.",
        }),
      ],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      featured: "featured",
      ribbon: "promoRibbon.enabled",
    },
    prepare: ({ title, media, featured, ribbon }) => ({
      title,
      subtitle: [featured ? "Featured" : null, ribbon ? "Homepage ribbon" : null]
        .filter(Boolean)
        .join(" · ") || undefined,
      media,
    }),
  },
});
