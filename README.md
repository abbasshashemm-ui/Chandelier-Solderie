# Chandelier Solderie — Next.js + Sanity

Modern luxury catalogue with **liquid glass** UI, built for **Vercel + Sanity free tiers**.

## Stack

- **Next.js 16** (App Router)
- **Sanity** (product CMS + embedded Studio at `/studio`)
- **Tailwind CSS v4**

## Quick start (development without Sanity)

```bash
cd web
npm install
npm run dev
```

Without Sanity configured, the site shows **8 demo products in development only**. Production builds show an empty catalogue until you connect Sanity and publish products.

## Connect Sanity (CMS admin)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` → `.env.local` and set:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. In Sanity project settings → **API** → **CORS origins**, add:
   - `http://localhost:3000`
   - Your Vercel production URL
4. Open [http://localhost:3000/studio](http://localhost:3000/studio) to add products (image upload, gallery, video, filters, publish)
5. Invite client/admin emails in Sanity project **Members** for Studio access

## On-demand revalidation

When a product is published, the site updates via webhook:

1. Set `SANITY_REVALIDATE_SECRET` in `.env.local` and Vercel
2. In Sanity → **API** → **Webhooks**, create a webhook:
   - URL: `https://your-domain.com/api/revalidate`
   - Method: POST
   - Header: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
   - Trigger: Create / Update / Delete on `product`

## Deploy to Vercel

```bash
npx vercel
```

Add all env vars from `.env.example` in the Vercel dashboard.

## Project structure

```
web/
├── sanity.config.ts        # Embedded Studio config
├── sanity/                 # Product schema
├── src/
│   ├── app/
│   │   ├── studio/         # CMS admin at /studio
│   │   ├── shop/           # Catalogue with search + filters
│   │   ├── product/[slug]/ # Product detail
│   │   └── inquire/        # Contact page
│   ├── components/         # Glass UI + catalogue
│   └── lib/                # Sanity client, filters, products
```

## Features

- Embedded Sanity Studio (`/studio`) for manual product entry
- Sidebar filters (style, material, room, price, dimensions) with URL sync
- Search by name or SKU
- Pagination (24 per page)
- Product detail pages with gallery + optional video
- WhatsApp inquiry CTA
- Sticky glass header (Home / Shop / Inquire)
- Featured products on home page
- SEO: per-product metadata, sitemap, robots

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run studio` | Standalone Sanity Studio (optional) |
