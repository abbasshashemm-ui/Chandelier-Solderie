import { defineArrayMember, defineType } from "sanity";
import { FormattedTextField, FormattedTextInput } from "../../src/sanity/formatted-text-input";

export const formattedText = defineType({
  name: "formattedText",
  title: "Formatted text",
  type: "array",
  components: {
    field: FormattedTextField,
    input: FormattedTextInput,
  },
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Paragraph", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [],
      },
    }),
  ],
});
