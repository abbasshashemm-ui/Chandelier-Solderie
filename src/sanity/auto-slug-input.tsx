"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  set,
  unset,
  useFormValue,
  type ObjectInputProps,
  type SlugValue,
} from "sanity";
import { slugify } from "@/lib/slug";

export function AutoSlugInput(props: ObjectInputProps<SlugValue>) {
  const title = useFormValue(["title"]);
  const next = typeof title === "string" && title.trim() ? slugify(title) : "";
  const current = props.value?.current ?? "";
  const { onChange } = props;
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!next) {
      if (current) onChangeRef.current(unset());
      return;
    }
    if (current !== next) {
      onChangeRef.current(set({ _type: "slug", current: next }));
    }
  }, [next, current]);

  return null;
}

export function HiddenSlugField(props: { children?: ReactNode }) {
  return <div style={{ display: "none" }}>{props.children}</div>;
}
