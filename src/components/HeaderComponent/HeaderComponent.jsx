import React, { useState } from "react";
import { Badge, Col, Popover } from "antd";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapprerContentPopup,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispacth(resetUser());
    setLoading(false);
  };
  const content = (
    <div>
      <WrapprerContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapprerContentPopup>
      <WrapprerContentPopup>Thông tin người dùng</WrapprerContentPopup>
    </div>
  );
  return (
    <div>
      <WrapperHeader gutter={20}>
        <Col span={6}>
          <WrapperTextHeader>ECOMMERCE</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            icon={<SearchOutlined />}
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
          <LoadingComponent isLoading={loading}>
            <WrapperHeaderAccount>
              <div>
                <UserOutlined style={{ fontSize: "30px" }} />
              </div>
              {user?.name ? (
                <Popover trigger={"click"} content={content}>
                  <div style={{ cursor: "pointer" }}>{user?.name}</div>
                </Popover>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng nhập/Đăng ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </LoadingComponent>

          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "30px", color: "#fff" }}
              />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
