import React, { useState } from "react";
import { Badge, Col, Image, Popover } from "antd";
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
import { searchProduct } from "../../redux/slides/productSlide";
const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);

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
      <WrapprerContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin người dùng
      </WrapprerContentPopup>
      {user?.isAdmin && (
        <WrapprerContentPopup onClick={() => navigate("/system/admin")}>
          Quản lý hệ thống
        </WrapprerContentPopup>
      )}
      <WrapprerContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapprerContentPopup>
    </div>
  );
  const onSearch = (e) => {
    // setSearch(e.target.value);
    dispacth(searchProduct(e.target.value));
  };
  return (
    <div>
      <WrapperHeader gutter={20}>
        <Col span={6}>
          <WrapperTextHeader>ECOMMERCE</WrapperTextHeader>
        </Col>

        <Col span={12}>
          {!isHiddenSearch && (
            <ButtonInputSearch
              icon={<SearchOutlined />}
              placeholder="Tìm kiếm sản phẩm"
              textButton="Tìm kiếm"
              size="large"
              onChange={onSearch}
            />
          )}
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <LoadingComponent isLoading={loading}>
            <WrapperHeaderAccount>
              <div>
                {user?.avatar ? (
                  <Image
                    src={user?.avatar}
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    alt="avatar"
                  />
                ) : (
                  <UserOutlined style={{ fontSize: "30px" }} />
                )}
              </div>
              {user?.access_token ? (
                <Popover
                  trigger={"click"}
                  content={content}
                  style={{ padding: "0" }}
                >
                  <div style={{ cursor: "pointer" }}>
                    {user?.name || user?.email || "User"}
                  </div>
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
          {!isHiddenCart && (
            <>
              <Badge count={4} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
