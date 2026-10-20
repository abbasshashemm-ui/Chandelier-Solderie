"use client";

import { TrashIcon, UnpublishIcon } from "@sanity/icons";
import { useCallback, useState } from "react";
import {
  useDocumentOperation,
  type DocumentActionComponent,
} from "sanity";

export const SimpleDeleteAction: DocumentActionComponent = (props) => {
  const { delete: del } = useDocumentOperation(props.id, props.type);
  const [open, setOpen] = useState(false);

  const onConfirm = useCallback(() => {
    del.execute();
    setOpen(false);
    props.onComplete();
  }, [del, props]);

  return {
    label: "Delete",
    icon: TrashIcon,
    tone: "critical",
    disabled: Boolean(del.disabled),
    title: del.disabled ? "Nothing to delete" : "Delete this document",
    onHandle: () => setOpen(true),
    dialog: open
      ? {
          type: "confirm" as const,
          tone: "critical" as const,
          message: "Delete this document? This cannot be undone.",
          onConfirm,
          onCancel: () => {
            setOpen(false);
            props.onComplete();
          },
        }
      : undefined,
  };
};

SimpleDeleteAction.action = "delete";
SimpleDeleteAction.displayName = "SimpleDeleteAction";

export const SimpleUnpublishAction: DocumentActionComponent = (props) => {
  const { unpublish } = useDocumentOperation(props.id, props.type);
  const [open, setOpen] = useState(false);

  const onConfirm = useCallback(() => {
    unpublish.execute();
    setOpen(false);
    props.onComplete();
  }, [props, unpublish]);

  if (unpublish.disabled) {
    return {
      label: "Unpublish",
      icon: UnpublishIcon,
      tone: "critical",
      disabled: true,
      title: "This document is not published",
    };
  }

  return {
    label: "Unpublish",
    icon: UnpublishIcon,
    tone: "critical",
    onHandle: () => setOpen(true),
    dialog: open
      ? {
          type: "confirm" as const,
          tone: "critical" as const,
          message:
            "Unpublish this document? It will leave the live site until you publish again.",
          onConfirm,
          onCancel: () => {
            setOpen(false);
            props.onComplete();
          },
        }
      : undefined,
  };
};

SimpleUnpublishAction.action = "unpublish";
SimpleUnpublishAction.displayName = "SimpleUnpublishAction";
