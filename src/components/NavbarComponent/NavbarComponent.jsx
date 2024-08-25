import React from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextValue,
  WapprerTextPrice,
} from "./style";
import { Checkbox, Rate } from "antd";
function NavbarComponent() {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, i) => {
          return <WrapperTextValue key={i}>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((option, i) => {
              return (
                <Checkbox
                  key={i}
                  value={option.value}
                  style={{ marginLeft: 0, fontSize: "1.6rem" }}
                >
                  {option.label}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option, i) => {
          return (
            <div style={{ display: "flex", gap: "10px" }}>
              <Rate
                style={{ fontSize: "1.6rem" }}
                key={i}
                disabled
                defaultValue={option}
              ></Rate>
              <span style={{ fontSize: "1.6rem" }}>{`Từ ${option} sao `}</span>
            </div>
          );
        });
      case "price":
        return options.map((option, i) => {
          return <WapprerTextPrice key={i}>{option}</WapprerTextPrice>;
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>
        {renderContent("text", ["Tu lanh", "TV", "Laptop"])}
      </WrapperContent>{" "}
    </div>
  );
}

export default NavbarComponent;
