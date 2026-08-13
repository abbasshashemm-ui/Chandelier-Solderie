const LISTING_FIELDS = `
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
  featured,
  "publishedAt": coalesce(publishedAt, _createdAt)
`;

export const PRODUCTS_QUERY = `*[_type == "product"] | order(featured desc, _createdAt desc) {
  ${LISTING_FIELDS},
  "imageUrl": select(defined(mainImage.asset->url) => mainImage.asset->url + "?w=800&fit=max&auto=format&q=75"),
  "imageLqip": mainImage.asset->metadata.lqip,
  "imageAlt": coalesce(mainImage.alt, title)
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  ${LISTING_FIELDS},
  shortDescription,
  description,
  "videoUrl": video.asset->url,
  "imageUrl": select(defined(mainImage.asset->url) => mainImage.asset->url + "?w=1200&fit=max&auto=format&q=75"),
  "imageLqip": mainImage.asset->metadata.lqip,
  "imageAlt": coalesce(mainImage.alt, title),
  "galleryUrls": gallery[].asset->url + "?w=1200&fit=max&auto=format&q=75"
}`;

export const PRODUCT_SLUGS_QUERY = `*[_type == "product" && defined(slug.current)][].slug.current`;

export const COLLECTIONS_QUERY = `*[_type == "collection"] | order(sortOrder asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  featured,
  sortOrder,
  includeSaleItems,
  "imageUrl": select(defined(image.asset->url) => image.asset->url + "?w=800&fit=max&auto=format&q=75"),
  "imageLqip": image.asset->metadata.lqip,
  "imageAlt": coalesce(image.alt, title)
}`;

export const COLLECTION_BY_SLUG_QUERY = `*[_type == "collection" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  featured,
  sortOrder,
  includeSaleItems,
  "imageUrl": select(defined(image.asset->url) => image.asset->url + "?w=800&fit=max&auto=format&q=75"),
  "imageLqip": image.asset->metadata.lqip,
  "imageAlt": coalesce(image.alt, title)
}`;
