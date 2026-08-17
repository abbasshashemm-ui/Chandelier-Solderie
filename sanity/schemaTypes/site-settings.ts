import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "showroom",
      title: "Showroom",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: "Defaults to “Visit the Showroom”.",
        }),
        defineField({
          name: "body",
          title: "Intro copy",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "mapQuery",
          title: "Map search",
          type: "string",
          description:
            "What to look up on the map. Leave blank to use the contact address.",
        }),
        defineField({
          name: "photos",
          title: "Showroom photos",
          type: "array",
          description:
            "Exterior and interior shots. Up to four appear beside the map.",
          of: [
            defineArrayMember({
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt text" }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "instagram",
      title: "Instagram feed",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: "Defaults to “In Their Homes”.",
        }),
        defineField({
          name: "body",
          title: "Intro copy",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
