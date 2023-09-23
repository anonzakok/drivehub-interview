import React, { FC, SyntheticEvent } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

interface IButtonProps {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  children?: any;
  onClick?(event: SyntheticEvent): void;
}

const StyledButtonText = styled.p`
  width: "max-content";
  font-size: 16px;
  line-height: 1;
  text-transform: unset;
`;
const StyledButton = styled(Button)`
  height: 56px !important;
  text-transform: unset !important;
  border-radius: 8px !important;
`;

const CustomButton: FC<IButtonProps> = ({
  className,
  onClick,
  disabled,
  children,
}) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      disabled={disabled}
      variant="contained"
    >
      <StyledButtonText>{children}</StyledButtonText>
    </StyledButton>
  );
};

export default CustomButton;
