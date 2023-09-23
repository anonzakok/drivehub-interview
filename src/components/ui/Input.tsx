import React, { FC, ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { InputSize, InputVariant } from "./enum/input.enum";

const InputBody = styled(TextField)`
  width: 100%;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  background-color: white;
  ::placeholder {
    color: rgba(0, 0, 0, 0.87);
    opacity: 0.42;
  }
`;

export interface IInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  info?: string;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  value?: string | null;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  onClick?: any;
  onBlur?(event: FocusEvent<HTMLInputElement>): void;
  type?: string;
  maxLength?: number;
  isMultiline?: boolean;
  inputComponent?: any;
  required?: boolean;
  onKeyPress?(event: KeyboardEvent<HTMLInputElement>): void;
}

const Input: FC<IInputProps> = ({
  label,
  placeholder,
  className,
  error,
  info,
  size = InputSize.SMALL,
  variant = InputVariant.OUTLINED,
  disabled,
  value,
  onChange,
  onClick,
  onBlur,
  type,
  maxLength = 255,
  isMultiline,
  inputComponent,
  required,
  onKeyPress,
}) => {
  return (
    <InputBody
      error={error ? true : false}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      variant={variant}
      value={value ? value : ""}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      type={type}
      inputProps={{
        maxLength: maxLength,
      }}
      multiline={isMultiline}
      InputProps={{
        inputComponent: inputComponent,
      }}
    />
  );
};

export default Input;
