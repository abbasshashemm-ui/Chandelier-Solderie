import {
  hasFormattedText,
  sanitizeDescriptionHtml,
  textHasMarkup,
  type FormattedSpan,
  type FormattedTextValue,
} from "@/lib/formatted-text";
import type { ReactNode } from "react";

type FormattedTextProps = {
  value?: FormattedTextValue;
  className?: string;
};

function decorate(text: string, marks: string[] = []): ReactNode {
  let node: ReactNode = text;
  if (marks.includes("strong")) {
    node = <strong className="font-medium text-ivory">{node}</strong>;
  }
  if (marks.includes("em")) {
    node = <em>{node}</em>;
  }
  if (marks.includes("underline")) {
    node = (
      <span className="underline decoration-gold/55 underline-offset-[0.18em]">
        {node}
      </span>
    );
  }
  return node;
}

function renderSpans(spans: FormattedSpan[] | undefined, blockKey: string) {
  if (!spans?.length) return null;

  return spans.map((span, index) => (
    <span key={span._key ?? `${blockKey}-${index}`}>
      {decorate(normalizeSpaces(span.text ?? ""), span.marks)}
    </span>
  ));
}

// Text pasted from WhatsApp/Word (or typed in the Studio editor) often uses
// non-breaking spaces, which turn a whole sentence into one unbreakable
// "word" that runs off the screen on phones.
function normalizeSpaces(text: string) {
  return text.replace(/\u00a0|&nbsp;/gi, " ");
}

export function FormattedText({ value: rawValue, className }: FormattedTextProps) {
  if (!hasFormattedText(rawValue)) return null;

  const value =
    typeof rawValue === "string" ? normalizeSpaces(rawValue) : rawValue;
  const wrapperClass = `product-description ${className ?? ""}`;

  if (typeof value === "string") {
    if (textHasMarkup(value)) {
      return (
        <div
          className={wrapperClass}
          dangerouslySetInnerHTML={{
            __html: sanitizeDescriptionHtml(value),
          }}
        />
      );
    }

    return (
      <div className={wrapperClass}>
        {value.split(/\n+/).map((paragraph, index) => (
          <p key={index} className="[&:not(:first-child)]:mt-[0.85em]">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  const blocks = Array.isArray(value) ? value : [];

  return (
    <div className={wrapperClass}>
      {blocks.map((block, index) => (
        <p
          key={block._key ?? index}
          className="[&:not(:first-child)]:mt-[0.85em]"
        >
          {renderSpans(block.children, block._key ?? String(index))}
        </p>
      ))}
    </div>
  );
}
