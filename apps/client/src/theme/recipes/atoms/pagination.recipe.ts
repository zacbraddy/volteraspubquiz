import { defineSlotRecipe } from "@pandacss/dev";

export const paginationRecipe = defineSlotRecipe({
  className: "pagination",
  description: "Styles for the pagination atom",
  slots: ["root", "item", "ellipsis", "prevTrigger", "nextTrigger"],
  base: {
    root: {
      gap: "0.5rem",
      display: "flex",
      alignItems: "center",
    },
    prevTrigger: {
      width: "2rem",
      height: "2.6rem",
      fontSize: "1.5rem",
      cursor: "pointer",
      "&> svg": {
        marginLeft: "0.25rem",
      },
      "&[data-disabled]": {
        backgroundColor: "{colors.neutral.primary.400}",
        cursor: "not-allowed",
      },
    },
    nextTrigger: {
      width: "2rem",
      height: "2.6rem",
      fontSize: "1.5rem",
      cursor: "pointer",
      "&> svg": {
        marginLeft: "0.25rem",
      },
      "&[data-disabled]": {
        backgroundColor: "{colors.neutral.primary.400}",
        cursor: "not-allowed",
      },
    },
    item: {
      width: "2rem",
      backgroundColor: "{colors.body.bg.400}",
      color: "{colors.body.text.400}",
      border: "1px solid {colors.comp.bold.400}",
      borderRadius: "5px",
      cursor: "pointer",
      "&.page-selected": {
        backgroundColor: "{colors.neutral.secondary.400}",
      },
    },
  },
});
