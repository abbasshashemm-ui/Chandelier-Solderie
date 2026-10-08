import type { CustomValidator } from "sanity";
import { slugify } from "../src/lib/slug";

const API_VERSION = "2024-01-01";

type Match = { title: string; sku?: string };

function describe(match: Match) {
  return `"${match.title}"${match.sku ? ` (SKU ${match.sku})` : ""}`;
}

// A product's draft and published copies share an ID apart from the prefix;
// they must not be reported as duplicates of each other.
function ownIds(id?: string) {
  const base = (id ?? "").replace(/^drafts\./, "");
  return [base, `drafts.${base}`];
}

/**
 * Warns (without blocking) when another product has the same title — or a
 * title that turns into the same web address (e.g. "Crystal-Halo" and
 * "Crystal Halo").
 */
export const warnDuplicateTitle: CustomValidator<string | undefined> = async (
  value,
  context,
) => {
  const title = value?.trim();
  if (!title) return true;

  const matches = await context.getClient({ apiVersion: API_VERSION }).fetch<
    Match[]
  >(
    `*[_type == "product" && !(_id in $ownIds) &&
       (lower(title) == lower($title) || slug.current == $slug)]
       {title, sku}[0...3]`,
    { title, slug: slugify(title), ownIds: ownIds(context.document?._id) },
  );

  if (!matches.length) return true;

  return `Another product already has this name: ${matches
    .map(describe)
    .join(", ")}. If this is the same piece, edit that one instead. If it is a different piece, add a distinguishing word to the name (for example the size or colour).`;
};

/** Warns (without blocking) when another product uses the same SKU. */
export const warnDuplicateSku: CustomValidator<string | undefined> = async (
  value,
  context,
) => {
  const sku = value?.trim();
  if (!sku) return true;

  const matches = await context.getClient({ apiVersion: API_VERSION }).fetch<
    Match[]
  >(
    `*[_type == "product" && !(_id in $ownIds) && lower(sku) == lower($sku)]
       {title, sku}[0...3]`,
    { sku, ownIds: ownIds(context.document?._id) },
  );

  if (!matches.length) return true;

  return `This SKU is already used by ${matches
    .map(describe)
    .join(", ")}. Each product should have its own SKU.`;
};
