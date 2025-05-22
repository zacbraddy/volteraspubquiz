import { type ComponentProps, forwardRef } from "react";
import { styled } from "styled-system/jsx";

import {
  Spinner as StyledSpinner,
  type SpinnerProps as StyledSpinnerProps,
} from "./styled/spinner";

export interface SpinnerProps
  extends StyledSpinnerProps,
    ComponentProps<typeof StyledSpinner> {
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   * @default "Loading..."
   */
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (props, ref) => {
    const { label = "Loading...", ...rest } = props;

    return (
      <StyledSpinner
        ref={ref}
        borderBottomColor="transparent"
        borderLeftColor="transparent"
        {...rest}
      >
        {label && <styled.span srOnly>{label}</styled.span>}
      </StyledSpinner>
    );
  },
);

Spinner.displayName = "Spinner";
