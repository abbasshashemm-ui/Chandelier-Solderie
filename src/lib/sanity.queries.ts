export const PRODUCTS_QUERY = `*[_type == "product"] | order(featured desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  sku,
  price,
  style,
  material,
  room,
  priceRange,
  dimensions,
  shortDescription,
  description,
  featured,
  "imageUrl": mainImage.asset->url,
  "imageAlt": coalesce(mainImage.alt, title),
  "galleryUrls": gallery[].asset->url,
  "publishedAt": coalesce(publishedAt, _createdAt)
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  sku,
  price,
  style,
  material,
  room,
  priceRange,
  dimensions,
  shortDescription,
  description,
  featured,
  "imageUrl": mainImage.asset->url,
  "imageAlt": coalesce(mainImage.alt, title),
  "galleryUrls": gallery[].asset->url,
  "publishedAt": coalesce(publishedAt, _createdAt)
}`;

export const PRODUCT_SLUGS_QUERY = `*[_type == "product" && defined(slug.current)][].slug.current`;
