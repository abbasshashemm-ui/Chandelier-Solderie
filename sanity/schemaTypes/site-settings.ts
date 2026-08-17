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
        defineField({
          name: "posts",
          title: "Posts",
          type: "array",
          description:
            "Installed pieces in client homes. Six appear on the homepage; the catalogue is used until you add some.",
          of: [
            defineArrayMember({
              type: "object",
              name: "post",
              fields: [
                defineField({
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: { hotspot: true },
                  fields: [{ name: "alt", type: "string", title: "Alt text" }],
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "url",
                  title: "Post link",
                  type: "url",
                  description: "Optional link to the Instagram post.",
                }),
                defineField({
                  name: "caption",
                  title: "Caption",
                  type: "string",
                }),
              ],
              preview: {
                select: { title: "caption", media: "image" },
                prepare: ({ title, media }) => ({
                  title: title || "Installation",
                  media,
                }),
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
