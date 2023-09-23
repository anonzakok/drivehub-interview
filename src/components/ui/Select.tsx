import React, { FC, useEffect, useState, FocusEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";
import { InputSize, InputVariant } from "./enum/input.enum";

const SelectBody = styled(Autocomplete)`
  width: 100%;

  .MuiIconButton-root {
    padding: 2px;
  }
`;

export type SelectOption = {
  value: number | string;
  text: string;
};

interface ISelectProps {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  info?: string;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  value?: number | number[] | string | string[] | null;
  onChange(value: unknown, event: unknown): void;
  onBlur?(event: FocusEvent<HTMLDivElement>): void;
  multiple?: boolean;
  options: SelectOption[];
  isLoading: boolean;
  startAdornment?: any;
}

const Select: FC<ISelectProps> = ({
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
  onBlur,
  multiple = false,
  options = [],
  isLoading,
  startAdornment,
}) => {
  const [optionLabels, setOptionLabels] = useState({});

  useEffect(() => {
    setOptionLabels(
      options.reduce((acc, { value, text }) => ({ ...acc, [value]: text }), {})
    );
  }, [options]);

  return (
    <SelectBody
      placeholder={placeholder}
      disableClearable={true}
      disabled={disabled}
      value={isLoading ? (multiple ? [] : null) : value}
      onChange={(_: any, newValue: any) => {
        if (onChange) onChange(newValue, _);
      }}
      onBlur={onBlur}
      multiple={multiple}
      options={options.map((option) => option.value)}
      loading={isLoading}
      getOptionLabel={(option: any) =>
        optionLabels[option as keyof typeof optionLabels] || ""
      }
      noOptionsText={"ไม่พบข้อมูล"}
      renderInput={({ ...param }) => (
        <TextField
          {...param}
          variant={variant}
          size={size}
          error={error ? true : false}
          InputProps={{
            ...param.InputProps,
            startAdornment: startAdornment,
            readOnly: true,
          }}
        />
      )}
    />
  );
};

export default Select;
