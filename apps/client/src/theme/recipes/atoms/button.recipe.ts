import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  description: "Styles for the button atom",
  base: {
    root: {
      width: "100%",
      backgroundColor: "{colors.primary.400}",
      color: "{colors.body.bg.400}",
      borderRadius: "5px",
      padding: "0.5rem",
      fontWeight: "700",
    },
  },
});
