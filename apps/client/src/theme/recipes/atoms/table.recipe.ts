import { defineSlotRecipe } from "@pandacss/dev";

export const tableRecipe = defineSlotRecipe({
  className: "table",
  description: "Styles for the table atom",
  slots: ["root", "body", "cell", "footer", "head", "header", "row", "caption"],
  base: {
    root: {
      width: "100%",
    },
    body: {
      color: "{colors.body.text.400}",
    },
    cell: {
      verticalAlign: "middle",
      padding: "1rem 0.5rem",
    },
    header: {
      color: "{colors.primary.400}",
      fontWeight: "medium",
      textAlign: "left",
      verticalAlign: "middle",
      backgroundColor: "{colors.neutral.secondary.400}",
      padding: "1rem 0.5rem",
      "&:first-of-type": {
        borderTopLeftRadius: "5px",
      },
      "&:last-of-type": {
        borderTopRightRadius: "5px",
      },
    },
    row: {
      borderBottomWidth: "1px",
      borderBottomColor: "{colors.neutral.primary.400}",
      transitionDuration: "normal",
      transitionProperty: "background, color",
      transitionTimingFunction: "default",
      backgroundColor: "{colors.body.bg.400}",
      "&:hover": {
        backgroundColor: "{colors.neutral.primary.400}",
      },
    },
  },
});
