'use client'

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "chandelier-solderie",
  title: "Chandelier Solderie",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Catalogue")
          .items([
            S.listItem()
              .title("Collections")
              .schemaType("collection")
              .child(S.documentTypeList("collection").title("Collections")),
            S.listItem()
              .title("Products")
              .schemaType("product")
              .child(
                S.documentTypeList("product")
                  .title("Products")
                  .defaultOrdering([{ field: "title", direction: "asc" }]),
              ),
            S.listItem()
              .title("On sale")
              .schemaType("product")
              .child(
                S.documentTypeList("product")
                  .title("On sale")
                  .filter('_type == "product" && onSale == true'),
              ),
            S.divider(),
            S.listItem()
              .title("Site settings")
              .schemaType("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site settings"),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
