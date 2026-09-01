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

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function sanitizeDescriptionHtml(html: string): string {
  return html
    .replace(/<\/?script\b[^>]*>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/<(?!\/?(strong|b|em|i|u|p|br)\b)[^>]+>/gi, "");
}

export function textHasMarkup(value: string): boolean {
  return /<(strong|b|em|i|u|p|br)\b/i.test(value);
}

export function textToEditorHtml(value: string): string {
  if (!value) return "";
  if (textHasMarkup(value)) return sanitizeDescriptionHtml(value);
  return escapeHtml(value).replace(/\n/g, "<br>");
}

export function editorHtmlToStored(html: string): string {
  const clean = sanitizeDescriptionHtml(html)
    .replace(/&nbsp;/g, " ")
    .trim();

  if (!textHasMarkup(clean)) {
    return clean
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p>/gi, "\n\n")
      .replace(/<\/?p>/gi, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
  }

  return clean;
}

export function blocksToHtml(blocks: FormattedBlock[]): string {
  return blocks
    .map((block) => {
      const inner = (block.children ?? [])
        .map((span) => {
          let text = escapeHtml(span.text ?? "");
          const marks = span.marks ?? [];
          if (marks.includes("strong")) text = `<strong>${text}</strong>`;
          if (marks.includes("em")) text = `<em>${text}</em>`;
          if (marks.includes("underline")) text = `<u>${text}</u>`;
          return text;
        })
        .join("");
      return inner;
    })
    .filter(Boolean)
    .join("<br><br>");
}

export function descriptionToPlainText(value?: FormattedTextValue): string {
  if (!value) return "";
  if (typeof value === "string") {
    return value
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
  }
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
