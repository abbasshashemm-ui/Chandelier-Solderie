export const SANITY_REVALIDATE_SECONDS = 3600;

export const sanityFetchOptions = {
  next: { tags: ["products"] as string[], revalidate: SANITY_REVALIDATE_SECONDS },
};
