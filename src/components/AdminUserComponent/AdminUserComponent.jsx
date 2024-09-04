import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import { getAlluser } from "../../services/UserService";
import { useSelector } from "react-redux";
import TableUser from "./TableUser.jsx";
import Create from "./Create.jsx";
import Update from "./Update.jsx";
import Delete from "./Delete.jsx";

const AdminUserComponent = () => {
  const user = useSelector((state) => state.user);
  const [rowSelected, setRowSelected] = useState();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleDeleteUser = () => {
    setIsOpenDelete(true);
    // console.log("ok");
  };
  const handleDetailUser = () => {
    // console.log(rowSelected);
    setIsOpenUpdate(true);
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
  const dataUserRefetch = () => {
    queryUsers.refetch();
  };

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <TableUser
        handleDeleteUser={handleDeleteUser}
        handleDetailUser={handleDetailUser}
        handleCreateUser={handleCreateUser}
        dataUsers={dataUsers}
        setRowSelected={setRowSelected}
        isLoadingUser={isLoadingUser}
      />
      <Create
        isOpenCreate={isOpenCreate}
        setIsOpenCreate={setIsOpenCreate}
        dataUserRefetch={dataUserRefetch}
      />
      <Update
        isOpenUpdate={isOpenUpdate}
        setIsOpenUpdate={setIsOpenUpdate}
        rowSelected={rowSelected}
        dataUserRefetch={dataUserRefetch}
      />
      <Delete
        isOpenDelete={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
        rowSelected={rowSelected}
        dataUserRefetch={dataUserRefetch}
      />
    </div>
  );
};

export default AdminUserComponent;
