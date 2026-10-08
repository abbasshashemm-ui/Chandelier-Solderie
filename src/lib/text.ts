const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

/**
 * Descriptions are plain-text fields in Sanity, but are sometimes pasted in
 * with HTML (e.g. "<p>…</p>"). Turn that into clean text where paragraphs are
 * separated by a blank line.
 */
export function cleanDescription(value?: string | null): string | undefined {
  if (!value) return undefined;

  const text = value
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/\s*(p|div|li|h[1-6])\s*>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39);/g, (entity) => ENTITIES[entity])
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text || undefined;
}

export function toParagraphs(value?: string): string[] {
  return value ? value.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean) : [];
}
