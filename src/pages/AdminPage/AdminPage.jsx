import {
  AppstoreOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUserComponent from "../../components/AdminUserComponent/AdminUserComponent";
import AdminProductComponent from "../../components/AdminProductComponent/AdminProductComponent";
import AdminOrderComponent from "../../components/AdminOrderComponent/AdminOrderComponent";

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
    getItem("Hoá đơn", "order", <SnippetsOutlined />),
  ];
  const [keySelected, setKeySelected] = useState("user");
  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUserComponent></AdminUserComponent>;
      case "product":
        return <AdminProductComponent></AdminProductComponent>;
      case "order":
        return <AdminOrderComponent></AdminOrderComponent>;
      default:
        return <></>;
    }
  };
  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          onClick={handleOnClick}
          style={{
            width: 256,
            height: "auto",
            boxShadow: "1px 1px 2px #ccc",
          }}
          items={items}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
