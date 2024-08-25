import React from "react";
import { Col, Image, Row } from "antd";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import imageProduct1 from "../../assets/images/product1.png";
import imageProductSmall1 from "../../assets/images/product1_small.png";
import imageProductSmall2 from "../../assets/images/prodcut1_small2.png";
import imageProductSmall3 from "../../assets/images/product1_small3.png";
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressPriceProduct,
  WrapperQualityProduct,
  WrapperNumberQuantity,
  WrapperButtonChoose,
  WrapperButtonCard,
} from "./style";

const ProductDetailComponent = () => {
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <Row style={{ padding: "16px", display: "flex", backgroundColor: "#fff" }}>
      <Col span={10}>
        <Image src={imageProduct1} preview={false} alt="image product"></Image>
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall1}
              preview={false}
              alt="image product"
            ></WrapperStyleImageSmall>
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall2}
              preview={false}
              alt="image product"
            ></WrapperStyleImageSmall>
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall3}
              preview={false}
              alt="image product"
            ></WrapperStyleImageSmall>
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall1}
              preview={false}
              alt="image product"
            ></WrapperStyleImageSmall>
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall2}
              preview={false}
              alt="image product"
            ></WrapperStyleImageSmall>
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall3}
              preview={false}
              alt="image product"
            ></WrapperStyleImageSmall>
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14}>
        <WrapperStyleNameProduct>
          Thám tử lừng danh Conan Tập 28
        </WrapperStyleNameProduct>
        <div>
          <StarFilled
            style={{ fontSize: "1.2rem", color: "rgb(253, 216, 54)" }}
          />
          <StarFilled
            style={{ fontSize: "1.2rem", color: "rgb(253, 216, 54)" }}
          />
          <StarFilled
            style={{ fontSize: "1.2rem", color: "rgb(253, 216, 54)" }}
          />
          <WrapperStyleTextSell> | Đã bán 1000+ </WrapperStyleTextSell>
        </div>

        <WrapperPriceProduct>
          <WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressPriceProduct>
          <span>Giao den </span>
          <span className="address">Q.1 Ben Nghe, P.Binh Thanh</span>
          <span className="change-address"> - Doi dia chi</span>
        </WrapperAddressPriceProduct>
        <WrapperQualityProduct>
          <span>Số lượng</span>
          <div style={{ display: "flex", margin: "10px" }}>
            <ButtonComponent
              size="small"
              icon={<PlusOutlined />}
              onChange={onChange}
            ></ButtonComponent>
            <WrapperNumberQuantity min={1} max={10} defaultValue={3} />
            <ButtonComponent
              size="small"
              icon={<MinusOutlined />}
              onChange={onChange}
            ></ButtonComponent>
          </div>
        </WrapperQualityProduct>
        <div>
          <WrapperButtonChoose
            size="lagre"
            textButton="Chọn mua"
          ></WrapperButtonChoose>{" "}
          <WrapperButtonCard
            size="lagre"
            textButton="Thêm giỏ hàng"
          ></WrapperButtonCard>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailComponent;
