import { Card } from "antd";
import { StarFilled } from "@ant-design/icons";
import React from "react";
import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperStyleTextSell,
} from "./style";

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    selled,
    discount,
  } = props;

  return (
    <Card
      hoverable
      style={{
        width: 240,
        padding: "10px",
        borderRadius: "4px",
      }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          height={200}
        />
      }
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
        <WrapperStyleTextSell>
          {" "}
          | Đã bán {selled || 1000}+{" "}
        </WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        {price}d<WrapperDiscountText>-{discount || 5}%</WrapperDiscountText>
      </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
