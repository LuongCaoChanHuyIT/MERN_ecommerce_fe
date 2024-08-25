import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton, icon } = props;
  return (
    <div style={{ display: "flex", backgroundColor: "#fff" }}>
      <InputComponent size={size} placeholder={placeholder} />
      <ButtonComponent
        size={size}
        textButton={textButton}
        icon={icon}
      ></ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
