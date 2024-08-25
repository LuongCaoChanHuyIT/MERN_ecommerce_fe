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

const CardComponent = () => {
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
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReportText>
        <span>
          <span>4.5</span>
          <StarFilled
            style={{ fontSize: "1.2rem", color: "rgb(253, 216, 54)" }}
          />
        </span>
        <WrapperStyleTextSell> | Đã bán 1000+ </WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000d<WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </Card>
  );
};

export default CardComponent;
