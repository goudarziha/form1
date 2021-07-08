import React, { useState } from "react";
import { Button, Input } from ".";
import styled from "styled-components";

export interface IConditional {
  name: string;
  show_if?: (value: any) => boolean;
}

interface IDataType {
  tag: string;
  name: string;
  type: string;
  human_label: string;
  conditional?: IConditional;
}

export interface IObj {
  [key: string]: any;
}

interface IForm {
  children?: Array<IDataType>;
  disabled?: boolean;
  handleSubmit?: (formData: IObj) => void;
}

const MainForm = styled.form`
  background: white;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 500px;
  padding: 30px 50px;
`;

const FormTitle = styled.h1`
  border-bottom: 1px solid white;
  color: #3d3d3d;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  padding: 10px;
  text-align: center;
`;

const Form = ({ children, handleSubmit, disabled }: IForm) => {
  const [values, setValues] = useState<IObj>({});

  /*
   * @param {string} name - key of field in object
   * @param {string} value -value for field in object
   */

  // Handles setting the hooks when values are changed in the form
  const handleFieldChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  /*
   * @param {string} date - date in string format YYYY-MM-DD'2020-02-03'
   */

  // Format input string date to allow conditional comparison
  const formatInputDateToDateObj = (date: string) => {
    const dateArr = date.split("-");
    return new Date(Number(dateArr[0]), Number(dateArr[1]), Number(dateArr[2]));
  };

  /*
   * @param {string} props - IDataType props
   */

  // Renders input
  const renderInput = (props: IDataType) => {
    const { name, tag, type, human_label } = props;

    return (
      <Input
        key={name}
        tag={tag}
        name={name}
        type={type}
        human_label={human_label}
        handleFieldChange={handleFieldChange}
      />
    );
  };

  return (
    <MainForm onSubmit={handleSubmit}>
      <FormTitle>Sparrow Form</FormTitle>
      {children &&
        children.map(({ name, tag, type, human_label, conditional }) => {
          if (conditional && conditional.name && conditional.show_if) {
            // Checks to see if conditional exists within object
            if (values && Object.keys(values).includes(conditional.name)) {
              // Uses the comparsion funciton within object to show consent field
              let showIf = conditional.show_if(
                formatInputDateToDateObj(values[conditional.name])
              );
              if (!showIf) {
                return null;
              } else {
                return renderInput({ name, tag, type, human_label });
              }
            }
          } else {
            return renderInput({ name, tag, type, human_label });
          }
        })}
      <Button type="submit" disabled={disabled}>
        Submit
      </Button>
    </MainForm>
  );
};

export default Form;
