export const SANITY_REVALIDATE_SECONDS = 60;

export const sanityFetchOptions = {
  next: { tags: ["products"] as string[], revalidate: SANITY_REVALIDATE_SECONDS },
};
