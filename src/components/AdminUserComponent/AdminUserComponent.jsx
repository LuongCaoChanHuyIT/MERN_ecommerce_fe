import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import { getAlluser } from "../../services/UserService";
import { useSelector } from "react-redux";
import Table from "./Table";
import Create from "./Create.jsx";
const AdminUserComponent = () => {
  const user = useSelector((state) => state.user);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const handleDeleteUser = () => {
    console.log("ok");
  };
  const handleDetailUser = () => {
    console.log("detail");
  };
  const handleCreateUser = () => {
    setIsOpenCreate(true);
  };
  const getAllUser = async () => {
    const res = await getAlluser(user?.access_token);
    return res;
  };
  const queryUsers = useQueryHooks(getAllUser, "product");
  const { data: dataUsers, isLoading: isLoadingUser } = queryUsers;
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <Table
        handleDeleteUser={handleDeleteUser}
        handleDetailUser={handleDetailUser}
        handleCreateUser={handleCreateUser}
        dataUsers={dataUsers}
        isLoadingUser={isLoadingUser}
      />
      <Create
        isOpenCreate={isOpenCreate}
        setIsOpenCreate={setIsOpenCreate}
        dataUsers={dataUsers}
      />
    </div>
  );
};

export default AdminUserComponent;
