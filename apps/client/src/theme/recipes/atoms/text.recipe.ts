import { defineRecipe } from "@pandacss/dev";

export const textRecipe = defineRecipe({
  className: "text",
  description: "Styles for the text atoms",
  variants: {
    variant: {
      heading: {
        color: "{colors.primary.400}",
        fontWeight: "700",
        fontSize: "2rem",
      },
    },
  },
});
