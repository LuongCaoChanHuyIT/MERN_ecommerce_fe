import React from "react";
import { Col } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
const HeaderComponent = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div>
      <WrapperHeader gutter={20}>
        <Col span={6}>
          <WrapperTextHeader>ECOMMERCE</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            placeholder="Tìm kiếm sản phẩm"
            textButton="Tìm kiếm"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <WrapperHeaderAccount>
            <div>
              <UserOutlined style={{ fontSize: "30px" }} />
            </div>

            <div>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div>
            <div>
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "#fff" }}
              />
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
