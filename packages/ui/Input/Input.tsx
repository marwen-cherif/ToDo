import React, { FC, forwardRef } from "react";
import MuiInput from "@mui/material/Input";
import { InputProps as MuiInputProps } from "@mui/material/Input/Input";

export enum InputTypes {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
}

interface InputProps extends Omit<MuiInputProps, "type"> {
  type?: InputTypes;
}

export const Input: FC<InputProps> = forwardRef(
  ({ type = InputTypes.TEXT, ...props }, ref) => {
    return <MuiInput type={type} {...props} ref={ref} />;
  }
);

Input.displayName = "Input";
