import React from "react";
import { WrapperInputStyle } from "./style";
const InputFormComponent = (props) => {
  const { placeholder = "Text input", ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.handleOnChange(e.target.value);
  };
  return (
    <>
      <WrapperInputStyle
        placeholder={placeholder}
        defaultValue={props.value}
        {...rests}
        onChange={handleOnChangeInput}
      ></WrapperInputStyle>
    </>
  );
};

export default InputFormComponent;
