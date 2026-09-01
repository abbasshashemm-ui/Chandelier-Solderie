import type { ReactNode } from "react";
import {
  hasFormattedText,
  type FormattedSpan,
  type FormattedTextValue,
} from "@/lib/formatted-text";

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
      {decorate(span.text ?? "", span.marks)}
    </span>
  ));
}

export function FormattedText({ value, className }: FormattedTextProps) {
  if (!hasFormattedText(value)) return null;

  if (typeof value === "string") {
    return (
      <div className={className}>
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
    <div className={className}>
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
