import { defineTokens } from "@pandacss/dev";

const colors = defineTokens.colors({
  primary: {
    400: { value: "#8B5557" },
  },
  secondary: {
    400: { value: "#D5B9B2" },
  },
  "neutral.primary": {
    400: { value: "#CEBEBE" },
  },
  "neutral.secondary": {
    400: { value: "#ECE2D0" },
  },
  "comp.bold": {
    400: { value: "#6D2E46" },
  },
  "body.text": {
    400: { value: "#353535" },
  },
  "body.bg": {
    400: { value: "#fafafa" },
  },
});

export { colors };
