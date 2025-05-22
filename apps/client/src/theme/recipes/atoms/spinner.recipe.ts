import { defineRecipe } from "@pandacss/dev";

export const spinnerRecipe = defineRecipe({
  className: "spinner",
  description: "Styles for the spinner atom",
  base: {
    color: "{colors.primary.400}",
    width: "2rem",
    height: "2rem",
    borderWidth: "3px",
    borderStyle: "solid",
    borderRadius: "50%",
    borderTopColor: "currentColor",
    borderRightColor: "currentColor",
    animation: "spin 0.75s linear infinite",
  },
});
