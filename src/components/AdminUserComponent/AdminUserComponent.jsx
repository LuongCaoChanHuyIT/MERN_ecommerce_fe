import React from "react";
import { WrapperHeader, WrapperButtonTable } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const AdminUserComponent = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <WrapperButtonTable>
        <ButtonComponent
          size={"medium"}
          icon={<PlusOutlined />}
          padding="0 40px"
          position="absolute"
          right="15px"
          top="30px"
          zIndex="1"
        ></ButtonComponent>
        <div style={{ marginTop: "20px" }}>
          <TableComponent />
        </div>
      </WrapperButtonTable>
    </div>
  );
};

export default AdminUserComponent;
