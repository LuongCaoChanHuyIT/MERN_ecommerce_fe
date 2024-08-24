import { Button } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const ButtonComponent = ({ size, textButton, ...rests }) => {
  return (
    <Button
      size={size}
      style={{
        borderRadius: "0",
        border: "none",
        backgroundColor: "rgb(13,92,182)",
        color: "#fff",
      }}
      icon={<SearchOutlined />}
      {...rests}
    >
      {textButton}
    </Button>
  );
};

export default ButtonComponent;
