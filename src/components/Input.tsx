import React from "react";
import styled from "styled-components";

export interface IInput {
  tag: string;
  name: string;
  type: string;
  human_label: string;
  handleFieldChange: (name: string, value: string) => void;
}

const MainInput = styled.input`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
`;

const InputLabel = styled.label`
  color: #3d3d3d;
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const InputWrapper = styled.div`
  margin: 10px 0;
`;

const Required = styled.span`
  color: red;
`;

const Input = ({ tag, name, type, human_label, handleFieldChange }: IInput) => {
  // Creates red asterix
  const RequiredInput = () => {
    return <Required>*</Required>;
  };

  return (
    <InputWrapper>
      <InputLabel htmlFor={name}>
        {human_label}
        <RequiredInput />
      </InputLabel>
      <MainInput
        id={tag}
        name={name}
        type={type}
        placeholder={human_label}
        required={true}
        onChange={(e) => handleFieldChange(name, e.target.value)}
      />
    </InputWrapper>
  );
};

export default Input;
