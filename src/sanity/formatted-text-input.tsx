"use client";

import { useEffect } from "react";
import {
  set,
  unset,
  type ArrayOfObjectsInputProps,
  type FieldProps,
} from "sanity";
import { stringToBlocks } from "@/lib/formatted-text";

function convertStringValue(
  value: unknown,
  onChange: ArrayOfObjectsInputProps["onChange"] | undefined,
) {
  if (typeof value !== "string" || !onChange) return;
  const blocks = stringToBlocks(value);
  onChange(blocks.length ? set(blocks) : unset());
}

export function FormattedTextField(props: FieldProps) {
  const { value, renderDefault } = props;
  const onChange =
    "inputProps" in props ? props.inputProps.onChange : undefined;

  useEffect(() => {
    convertStringValue(value, onChange);
  }, [onChange, value]);

  return renderDefault(props);
}

export function FormattedTextInput(props: ArrayOfObjectsInputProps) {
  const { value, onChange, renderDefault } = props;

  useEffect(() => {
    convertStringValue(value, onChange);
  }, [onChange, value]);

  if (typeof value === "string") {
    return null;
  }

  return renderDefault(props);
}
