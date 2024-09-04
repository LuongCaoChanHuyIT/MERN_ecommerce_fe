import React from "react";
import { WrapperInputStyle } from "./style";
import { InputNumber, Mentions } from "antd";
const InputFormComponent = (props) => {
  const { placeholder, typeInput, disabled = false, ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value);
    // props.onChange(e);
  };
  const handleOnChangeInputNumber = (e) => {
    props.onChange(e);
  };
  const handleOnChangeInputParagraph = (e) => {
    props.onChange(e);
  };
  const renderInputForType = (typeInput) => {
    switch (typeInput) {
      case "NUMBER":
        return (
          <InputNumber
            min={1}
            {...rests}
            value={props.value}
            onChange={handleOnChangeInputNumber}
          />
        );
      case "TEXT":
        return (
          <WrapperInputStyle
            placeholder={placeholder}
            defaultValue={props.value}
            disabled={disabled}
            {...rests}
            onChange={handleOnChangeInput}
          ></WrapperInputStyle>
        );
      case "PARAGRAPH":
        return (
          <Mentions
            {...rests}
            rows={3}
            placeholder={placeholder}
            onChange={handleOnChangeInputParagraph}
          />
        );

      default:
        <></>;
    }
  };
  return <>{renderInputForType(typeInput)}</>;
};

export default InputFormComponent;
