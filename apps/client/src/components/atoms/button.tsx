import { forwardRef } from "react";
import { Center, styled } from "styled-system/jsx";

import {
  Button as StyledButton,
  type ButtonProps as StyledButtonProps,
} from "./styled/button";
import { Spinner } from "./spinner.tsx";

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export interface ButtonProps extends StyledButtonProps, ButtonLoadingProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { loading, disabled, loadingText, children, ...rest } = props;

    const trulyDisabled = loading ?? disabled;

    return (
      <StyledButton disabled={trulyDisabled} ref={ref} {...rest}>
        {loading && !loadingText ? (
          <>
            <ButtonSpinner />
            <styled.span opacity={0}>{children}</styled.span>
          </>
        ) : (
          (loadingText ?? children)
        )}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";

const ButtonSpinner = () => (
  <Center
    inline
    position="absolute"
    transform="translate(-50%, -50%)"
    top="50%"
    insetStart="50%"
  >
    <Spinner
      width="1.1em"
      height="1.1em"
      borderWidth="1.5px"
      borderTopColor="fg.disabled"
      borderRightColor="fg.disabled"
    />
  </Center>
);
