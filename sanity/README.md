# Sanity schema

Product model: `sanity/schemaTypes/product.ts`

## Setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` → `.env.local` with your project ID
3. Open `/studio` in the Next.js app to manage products

The embedded Studio uses `sanity.config.ts` at the project root.

## Webhook

Configure a webhook pointing to `/api/revalidate` — see `web/README.md`.
