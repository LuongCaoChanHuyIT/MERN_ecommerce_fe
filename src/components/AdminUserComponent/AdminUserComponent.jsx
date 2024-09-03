import React from "react";
import { WrapperHeader } from "./style";
import Table from "./Table";

const AdminUserComponent = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <Table />
    </div>
  );
};

export default AdminUserComponent;
