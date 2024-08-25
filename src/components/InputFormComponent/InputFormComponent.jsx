import React, { useState } from "react";
import { WrapperInputStyle } from "./style";
const InputFormComponent = (props) => {
  const [valueInput, setValueInput] = useState("");
  const { placeholder = "Text input", ...rests } = props;
  const style = {};
  return (
    <>
      <WrapperInputStyle
        placeholder={placeholder}
        defaultValue={valueInput}
        {...rests}
      ></WrapperInputStyle>
    </>
  );
};

export default InputFormComponent;
