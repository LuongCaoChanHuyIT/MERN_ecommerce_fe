import React, { useEffect, useState } from "react";
import { Col, Image, Row, Spin } from "antd";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

import {
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressPriceProduct,
  WrapperQualityProduct,
  WrapperNumberQuantity,
  WrapperButtonChoose,
} from "./style";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrderProduct,
  provisonalOrder,
} from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";

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
          key={i}
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
      if (numProduct !== 1) setNumproduct((prev) => prev - 1);
    }
  };
  const handleAddOrderProduct = () => {
    // if (!user?.id) {
    //   navigate("/sign-in", { state: location?.pathname });
    // } else {
    dispatch(provisonalOrder());
    dispatch(
      addOrderProduct({
        orderItem: {
          name: productDetatils?.name,
          amount: numProduct,
          discount: productDetatils?.discount,
          image: productDetatils?.image,
          price: productDetatils?.price,
          product: productDetatils._id,
          checked: false,
        },
      })
    );
    // }
  };
  useEffect(() => {
    initFacebookSDK();
  }, []);
  return (
    <Spin spinning={isLoading}>
      <Row
        style={{
          padding: "16px",
          display: "flex",
          backgroundColor: "#fff",
          width: "100%",
        }}
      >
        <Col span={10} style={{ paddingRight: "10px" }}>
          <Image
            src={productDetatils?.image}
            preview={false}
            alt="image product"
          ></Image>
          {/* <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={defaultImage}
                preview={false}
                alt="image product"
              ></WrapperStyleImageSmall>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={defaultImage}
                preview={false}
                alt="image product"
              ></WrapperStyleImageSmall>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={defaultImage}
                preview={false}
                alt="image product"
              ></WrapperStyleImageSmall>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={defaultImage}
                preview={false}
                alt="image product"
              ></WrapperStyleImageSmall>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={defaultImage}
                preview={false}
                alt="image product"
              ></WrapperStyleImageSmall>
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={defaultImage}
                preview={false}
                alt="image product"
              ></WrapperStyleImageSmall>
            </WrapperStyleColImage>
          </Row> */}
        </Col>
        <Col span={14}>
          <WrapperStyleNameProduct>
            {productDetatils?.name}
          </WrapperStyleNameProduct>
          <div>
            {renderStar(productDetatils?.rating)}
            <WrapperStyleTextSell>
              | Đã bán {productDetatils?.selled}+{" "}
            </WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productDetatils?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressPriceProduct>
            <span>Giao đến: </span>
            <span className="address">{user?.address}</span>
            <span className="change-address"> - Đổi địa chỉ</span>
          </WrapperAddressPriceProduct>
          <LikeButtonComponent dataHref="https://developers.facebook.com/docs/plugins/" />
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
            <WrapperButtonChoose
              disabled={productDetatils?.countInStock === 0 ? true : false}
              onClick={handleAddOrderProduct}
            >
              Chọn mua
            </WrapperButtonChoose>
            <div
              style={{ fontSize: "1.2rem", color: "red", textAlign: "center" }}
            >
              {productDetatils?.countInStock === 0
                ? "Sản phẩm hết hàng"
                : "Chúc quý khách mua hàng vui vẻ"}
            </div>
            {/* <WrapperButtonCard>Thêm giỏ hàng</WrapperButtonCard> */}
          </div>
        </Col>
        <CommentComponent dataHref="https://developers.facebook.com/docs/plugins/comments#configurator" />
      </Row>
    </Spin>
  );
};

export default ProductDetailComponent;
