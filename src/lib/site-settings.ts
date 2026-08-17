import { cache } from "react";
import { sanityFetchOptions } from "./cache";
import { SITE_SETTINGS_QUERY } from "./sanity.queries";
import { isSanityConfigured, sanityClient } from "./sanity.client";
import type { SiteSettings } from "./types";

const EMPTY_SETTINGS: SiteSettings = {};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSanityConfigured) {
    return EMPTY_SETTINGS;
  }

  try {
    const settings = await sanityClient.fetch<SiteSettings | null>(
      SITE_SETTINGS_QUERY,
      {},
      sanityFetchOptions,
    );
    return settings ?? EMPTY_SETTINGS;
  } catch {
    return EMPTY_SETTINGS;
  }
});
