# Chandelier Solderie — Next.js + Sanity

Modern luxury catalogue with **liquid glass** UI, built for **Vercel + Sanity free tiers**.

## Stack

- **Next.js 16** (App Router)
- **Sanity** (product CMS)
- **Tailwind CSS v4**
- **Mock data fallback** when Sanity isn't configured yet

## Quick start (free, no Sanity account needed)

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see 6 sample products with filters, quick view, and WhatsApp inquire buttons.

## Connect Sanity (free tier)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` → `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Run the embedded studio at [http://localhost:3000/studio](http://localhost:3000/studio)
4. Create **Product** documents matching the schema in `sanity/schemaTypes/product.ts`
5. Publish products — they replace mock data automatically

## Deploy to Vercel (free tier for testing)

```bash
npx vercel
```

Add the same env vars in the Vercel dashboard.

> **Note:** Vercel Hobby is free for personal projects. Use **Pro ($20/mo)** when you launch commercially.

## Project structure

```
web/
├── sanity/                 # Sanity schema
├── sanity.config.ts        # Studio config
├── src/
│   ├── app/                # Pages + embedded /studio
│   ├── components/         # Glass UI + catalogue
│   └── lib/                # Sanity client, filters, mock data
```

## Brand tokens (from WP theme)

| Token | Value |
|-------|-------|
| Gold | `#c9a962` |
| Black | `#1a1a1a` |
| Serif | Cormorant Garamond |
| Sans | Montserrat |

## Features ported from WP theme

- Sidebar filters (style, material, room, price, dimensions)
- 4-column product grid
- Quick view modal
- WhatsApp inquiry CTA
- Product detail pages
- Sticky glass header (Home / Shop)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
