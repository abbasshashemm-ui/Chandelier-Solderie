"use client";

import { useEffect, useRef } from "react";
import {
  set,
  unset,
  type FieldProps,
  type StringInputProps,
} from "sanity";
import {
  blocksToHtml,
  editorHtmlToStored,
  textToEditorHtml,
  type FormattedBlock,
} from "@/lib/formatted-text";

function fieldOnChange(props: FieldProps) {
  if (!("inputProps" in props)) return undefined;
  return props.inputProps.onChange as StringInputProps["onChange"] | undefined;
}

export function FormattedTextField(props: FieldProps) {
  const { value, renderDefault } = props;
  const onChange = fieldOnChange(props);

  useEffect(() => {
    if (!onChange || !Array.isArray(value)) return;
    const html = blocksToHtml(value as FormattedBlock[]);
    onChange(html ? set(html) : unset());
  }, [onChange, value]);

  if (Array.isArray(value)) {
    return (
      <div style={{ padding: "0.75rem 0", fontSize: "0.8125rem", opacity: 0.72 }}>
        Keeping your description…
      </div>
    );
  }

  return renderDefault(props);
}

export function FormattedTextInput(props: StringInputProps) {
  const { value, onChange, readOnly, elementProps } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const lastEmitted = useRef<string | undefined>(undefined);
  const text = typeof value === "string" ? value : "";

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (lastEmitted.current === text) return;
    const html = textToEditorHtml(text);
    if (el.innerHTML !== html) el.innerHTML = html;
  }, [text]);

  const emit = () => {
    const el = editorRef.current;
    if (!el) return;
    const stored = editorHtmlToStored(el.innerHTML);
    lastEmitted.current = stored;
    onChange(stored ? set(stored) : unset());
  };

  const apply = (command: "bold" | "italic" | "underline") => {
    editorRef.current?.focus();
    document.execCommand(command, false);
    emit();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "0.35rem",
          marginBottom: "0.45rem",
        }}
      >
        <MarkButton disabled={readOnly} label="B" title="Bold" onClick={() => apply("bold")} />
        <MarkButton
          disabled={readOnly}
          label="I"
          title="Italic"
          italic
          onClick={() => apply("italic")}
        />
        <MarkButton
          disabled={readOnly}
          label="U"
          title="Underline"
          underline
          onClick={() => apply("underline")}
        />
      </div>
      <div
        ref={editorRef}
        id={elementProps.id}
        contentEditable={!readOnly}
        suppressContentEditableWarning
        onInput={emit}
        onBlur={elementProps.onBlur}
        onFocus={elementProps.onFocus}
        aria-describedby={elementProps["aria-describedby"]}
        style={{
          minHeight: "9.5rem",
          padding: "0.75rem 0.85rem",
          border: "1px solid var(--card-border-color, #3d3932)",
          borderRadius: 2,
          background: "var(--input-bg-color, transparent)",
          color: "var(--card-fg-color, inherit)",
          lineHeight: 1.65,
          outline: "none",
          whiteSpace: "pre-wrap",
        }}
      />
    </div>
  );
}

function MarkButton({
  label,
  title,
  italic,
  underline,
  disabled,
  onClick,
}: {
  label: string;
  title: string;
  italic?: boolean;
  underline?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(event) => {
        event.preventDefault();
        onClick();
      }}
      style={{
        minWidth: "2rem",
        height: "1.85rem",
        padding: "0 0.45rem",
        border: "1px solid var(--card-border-color, #3d3932)",
        background: "transparent",
        color: "inherit",
        fontWeight: 700,
        fontStyle: italic ? "italic" : "normal",
        textDecoration: underline ? "underline" : "none",
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {label}
    </button>
  );
}
