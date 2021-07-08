import React from "react";
import styled from "styled-components";

export interface IButton {
  children?: any;
  disabled?: boolean;
  type?: "button" | "submit";
}

const MainButton = styled.button`
  padding: 10px;
`;

const Button = ({ children, type, disabled }: IButton) => {
  return (
    <MainButton type={type} disabled={disabled}>
      {children}
    </MainButton>
  );
};

export default Button;
