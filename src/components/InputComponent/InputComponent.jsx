import { Input } from "antd";
import React from "react";

const InputComponent = ({ size, placeholder, ...rests }) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      style={{ borderRadius: "0", border: "none" }}
      {...rests}
    />
  );
};

export default InputComponent;
