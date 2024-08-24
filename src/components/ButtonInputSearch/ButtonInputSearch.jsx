import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton } = props;
  return (
    <div style={{ display: "flex", backgroundColor: "#fff" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
       
        
      />
      <ButtonComponent size={size} textButton={textButton}></ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
