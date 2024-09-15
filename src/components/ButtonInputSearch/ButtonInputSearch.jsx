import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = ({ size, placeholder, textButton, icon, props }) => {
  // const { size, placeholder, textButton, icon } = props;
  return (
    <div style={{ display: "flex", backgroundColor: "#fff" }}>
      <InputComponent size={size} placeholder={placeholder} {...props} />
      <ButtonComponent
        size={size}
        textButton={textButton}
        icon={icon}
      ></ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
