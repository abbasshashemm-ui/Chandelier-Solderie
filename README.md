# Chandelier Solderie — Next.js + Sanity

Luxury lighting catalogue with a dark "Nocturne" showroom UI, built for Vercel + Sanity.

## Stack

- Next.js 16 (App Router)
- Sanity (product CMS + embedded Studio at `/studio`)
- Tailwind CSS v4

## Quick start

```bash
npm install
npm run dev
```

Without Sanity configured, the catalogue is empty until you connect a project and publish products.

## Connect Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` → `.env.local` and set:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
3. In Sanity → API → CORS origins, add `http://localhost:3000` and your Vercel URL
4. Open `/studio` to manage collections, products, and site settings
5. Invite admin emails in Sanity project Members

Optional seed:

```bash
SANITY_API_TOKEN=<editor-token> npm run seed:products
```

## On-demand revalidation

1. Set `SANITY_REVALIDATE_SECRET` in `.env.local` and Vercel
2. In Sanity → API → Webhooks:
   - URL: `https://your-domain.com/api/revalidate`
   - Header: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
   - Trigger: Create / Update / Delete on `product`, `collection`, and `siteSettings`

## Deploy

```bash
npx vercel
```

Add all env vars from `.env.example` in the Vercel dashboard.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run studio` | Standalone Sanity Studio |
| `npm run seed:products` | Upsert seed collections/products |
