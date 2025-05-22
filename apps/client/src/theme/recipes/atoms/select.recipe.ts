import { defineSlotRecipe } from "@pandacss/dev";

export const selectRecipe = defineSlotRecipe({
  className: "select",
  description: "Styles for the select atom",
  slots: ["root", "label", "trigger", "content", "item"],
  base: {
    root: {
      width: "100%",
    },
    trigger: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      border: "1px solid {colors.primary.400}",
      borderRadius: "5px",
      padding: "0.5rem",
      alignItems: "center",
      color: "{colors.body.text.400}",
      backgroundColor: "{colors.body.bg.400}",
    },
    content: {
      border: "1px solid {colors.primary.400}",
      backgroundColor: "{colors.neutral.secondary.400}",
      borderRadius: "5px",
    },
    item: {
      color: "{colors.body.text.400}",
      display: "flex",
      justifyContent: "space-between",
      padding: "0.5rem",
      "&:hover": {
        backgroundColor: "{colors.neutral.primary.400}",
      },
      "&:first-of-type": {
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
      },
      "&:last-of-type": {
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
      },
    },
  },
});
