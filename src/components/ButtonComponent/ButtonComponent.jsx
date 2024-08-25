import { Button } from "antd";
import React from "react";

const ButtonComponent = ({ size, textButton, icon, ...rests }) => {
  return (
    <Button
      size={size}
      style={{
        borderRadius: "0",
        border: "none",
        backgroundColor: "rgb(13,92,182)",
        color: "#fff",
      }}
      icon={icon}
      {...rests}
    >
      {textButton}
    </Button>
  );
};

export default ButtonComponent;
