import React, { useEffect, useState } from "react";
import { WrapperContent, WrapperLabelText, WapprerTextPrice } from "./style";
import { Checkbox, Rate } from "antd";
import * as ProductSevice from "../../services/ProductService";
import TypeProductComponent from "../TypeProductComponent/TypeProductComponent";

function NavbarComponent({ handleGetForPrice }) {
  const [typeProduct, setTypeProduct] = useState([]);

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option, i) => {
          return (
            <TypeProductComponent name={option} key={i}>
              {option}
            </TypeProductComponent>
          );
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
          return (
            <WapprerTextPrice key={i} onClick={() => handleGetForPrice(option)}>
              {option}
            </WapprerTextPrice>
          );
        });
      default:
        return {};
    }
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductSevice.getAllTypeProduct();
    if (res?.status === "SUCCESS") {
      setTypeProduct(res?.data);
    }
  };
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  return (
    <div>
      <WrapperLabelText>Loại sản phẩm</WrapperLabelText>
      <WrapperContent>{renderContent("text", typeProduct)}</WrapperContent>
      <WrapperLabelText>Giá tiền</WrapperLabelText>
      <WrapperContent>
        {renderContent("price", ["<100.000", "100.000 - 300.000", ">300.000"])}
      </WrapperContent>
    </div>
  );
}

export default NavbarComponent;
