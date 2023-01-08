import React, { FC, PropsWithChildren } from "react";
import MuiButton from "@mui/material/Button";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button/Button";

export enum ButtonTypes {
  BUTTON = "button",
  RESET = "reset",
  SUBMIT = "submit",
}
interface ButtonProps extends MuiButtonProps {
  type?: ButtonTypes;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  type = ButtonTypes.BUTTON,
  ...rest
}) => {
  return (
    <MuiButton type={type} variant="contained" {...rest}>
      {children}
    </MuiButton>
  );
};

Button.displayName = "Button";
