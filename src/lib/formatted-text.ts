export type FormattedSpan = {
  _type?: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

export type FormattedBlock = {
  _type: string;
  _key?: string;
  style?: string;
  children?: FormattedSpan[];
};

export type FormattedTextValue = string | FormattedBlock[];

function blockKey() {
  return Math.random().toString(36).slice(2, 10);
}

export function stringToBlocks(text: string): FormattedBlock[] {
  const paragraphs = text
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return [];

  return paragraphs.map((paragraph) => ({
    _type: "block",
    _key: blockKey(),
    style: "normal",
    children: [
      {
        _type: "span",
        _key: blockKey(),
        text: paragraph,
        marks: [],
      },
    ],
  }));
}

export function descriptionToPlainText(value?: FormattedTextValue): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (!Array.isArray(value)) return "";

  return value
    .map((block) =>
      (block.children ?? []).map((span) => span.text ?? "").join(""),
    )
    .filter((part) => part.trim())
    .join(" ")
    .trim();
}

export function hasFormattedText(value?: FormattedTextValue): boolean {
  return descriptionToPlainText(value).length > 0;
}
