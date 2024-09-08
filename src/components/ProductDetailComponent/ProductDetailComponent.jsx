import React, { useState } from "react";
import { Col, Image, Row, Spin } from "antd";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
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
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from "../../redux/slides/orderSlide";
const ProductDetailComponent = ({ idProduct }) => {
  const [numProduct, setNumproduct] = useState(1);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const onChange = (value) => {
    setNumproduct(Number(value));
  };
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(idProduct);
    return res.data;
  };
  const { data: productDetatils, isLoading } = useQuery({
    queryKey: ["product-details"],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  const renderStar = (num) => {
    const row = [];
    for (let i = 0; i < num; i++) {
      row.push(
        <StarFilled
          style={{ fontSize: "1.2rem", color: "rgb(253, 216, 54)" }}
        />
      );
    }
    return row;
  };
  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumproduct((prev) => prev + 1);
    } else {
      setNumproduct((prev) => prev - 1);
    }
  };
  const handleAddOrderProduct = () => {
    // if (!user?.id) {
    //   navigate("/sign-in", { state: location?.pathname });
    // } else {

    dispatch(
      addOrderProduct({
        orderItem: {
          name: productDetatils?.name,
          amount: numProduct,
          image: productDetatils?.image,
          price: productDetatils?.price,
          product: productDetatils._id,
          checked: false,
        },
      })
    );
    // }
  };
  return (
    <Spin spinning={isLoading}>
      <Row
        style={{ padding: "16px", display: "flex", backgroundColor: "#fff" }}
      >
        <Col span={10}>
          <Image
            src={productDetatils?.image}
            preview={false}
            alt="image product"
          ></Image>
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
            {productDetatils?.name}
          </WrapperStyleNameProduct>
          <div>
            {renderStar(productDetatils?.rating)}

            <WrapperStyleTextSell> | Đã bán 1000+ </WrapperStyleTextSell>
          </div>

          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {productDetatils?.price}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressPriceProduct>
            <span>Giao đến: </span>
            <span className="address">{user?.address}</span>
            <span className="change-address"> - Đổi địa chỉ</span>
          </WrapperAddressPriceProduct>
          <WrapperQualityProduct>
            <span>Số lượng</span>
            <div style={{ display: "flex", margin: "10px" }}>
              <ButtonComponent
                size="large"
                icon={<PlusOutlined />}
                onClick={() => handleChangeCount("increase")}
              ></ButtonComponent>
              <WrapperNumberQuantity
                onChange={onChange}
                min={1}
                value={numProduct}
                defaultValue={1}
              />
              <ButtonComponent
                size="large"
                icon={<MinusOutlined />}
                onClick={() => handleChangeCount("Decrease")}
              ></ButtonComponent>
            </div>
          </WrapperQualityProduct>
          <div style={{ marginTop: "50px" }}>
            <WrapperButtonChoose onClick={handleAddOrderProduct}>
              Chọn mua
            </WrapperButtonChoose>
            <WrapperButtonCard>Thêm giỏ hàng</WrapperButtonCard>
          </div>
        </Col>
      </Row>
    </Spin>
  );
};

export default ProductDetailComponent;
