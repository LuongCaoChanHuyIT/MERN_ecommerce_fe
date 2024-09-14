/* eslint-disable no-unused-vars */
import { Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperStyleTextSell,
} from "./style";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image = "",
    name = "",
    price = "",
    rating = "",
    type,
    selled = "",
    discount = "",
    id = "",
    disabled = false,
  } = props;
  const navigate = useNavigate();
  const handleDetailProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <Card
      hoverable
      style={{
        width: "100%",
        height: "100%",
        padding: "8px",
        borderRadius: "4px",
        backgroundColor: `${countInStock === 0 && "#f0f0f0"}`,
        cursor: `${countInStock === 0 && "not-allowed"}`,
      }}
      onClick={() => countInStock !== 0 && handleDetailProduct(id)}
      cover={<img alt="example" src={image} height={200} />}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>
          <span>{rating}</span>
          <StarFilled
            style={{
              fontSize: "0.8rem",
              color: "rgb(253, 216, 54)",
              margin: "3px",
            }}
          />
        </span>
        <WrapperStyleTextSell>| Đã bán {selled || 1000}+ </WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        {convertPrice(price)} VNĐ
        <WrapperDiscountText>-{discount || 5}%</WrapperDiscountText>
      </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
