export const PRODUCTS_QUERY = `*[_type == "product"] | order(featured desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  sku,
  price,
  compareAtPrice,
  onSale,
  style,
  material,
  room,
  dimensions,
  category,
  "collectionSlug": collection->slug.current,
  "collectionTitle": collection->title,
  shortDescription,
  description,
  featured,
  "imageUrl": mainImage.asset->url,
  "imageAlt": coalesce(mainImage.alt, title),
  "galleryUrls": gallery[].asset->url,
  "videoUrl": video.asset->url,
  "publishedAt": coalesce(publishedAt, _createdAt)
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  sku,
  price,
  compareAtPrice,
  onSale,
  style,
  material,
  room,
  dimensions,
  category,
  "collectionSlug": collection->slug.current,
  "collectionTitle": collection->title,
  shortDescription,
  description,
  featured,
  "imageUrl": mainImage.asset->url,
  "imageAlt": coalesce(mainImage.alt, title),
  "galleryUrls": gallery[].asset->url,
  "videoUrl": video.asset->url,
  "publishedAt": coalesce(publishedAt, _createdAt)
}`;

export const PRODUCT_SLUGS_QUERY = `*[_type == "product" && defined(slug.current)][].slug.current`;

export const COLLECTIONS_QUERY = `*[_type == "collection"] | order(sortOrder asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  featured,
  sortOrder,
  "imageUrl": image.asset->url,
  "imageAlt": coalesce(image.alt, title)
}`;

export const COLLECTION_BY_SLUG_QUERY = `*[_type == "collection" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  featured,
  sortOrder,
  "imageUrl": image.asset->url,
  "imageAlt": coalesce(image.alt, title)
}`;
