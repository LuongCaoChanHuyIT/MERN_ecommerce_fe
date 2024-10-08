import React from "react";
import { useNavigate } from "react-router-dom";

const TypeProductComponent = ({ name }) => {
  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: type }
    );
    // navigate(`/product/${type}`);
  };
  return (
    <div
      style={{ fontSize: "1.8rem", cursor: "pointer" }}
      onClick={() => {
        handleNavigateType(name);
      }}
    >
      {name}
    </div>
  );
};

export default TypeProductComponent;
