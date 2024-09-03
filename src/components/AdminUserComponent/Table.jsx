import React, { useState } from "react";
import { WrapperButtonTable } from "./style";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { Image, Spin, Table } from "antd";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import * as UserService from "../../services/UserService";
import { useSelector } from "react-redux";
const Create = () => {
  const user = useSelector((state) => state.user);
  const [rowSelected, setRowSelected] = useState();
  const renderAvatar = (image) => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={image}
          style={{
            height: "50px",
            width: "auto",
            objectFit: "cover",
          }}
          alt="avatar"
        />
      </div>
    );
  };
  const renderAction = () => {
    return (
      <>
        <div>
          <DeleteOutlined
            style={{ fontSize: "20px", color: "red" }}
            //  onClick={handleDeletesProduct}
          />
          <EditOutlined
            style={{ fontSize: "20px", color: "orange" }}
            //  onClick={handleDetailsProduct}
          />
        </div>
      </>
    );
  };
  const renderIsAdmin = (isAdmin) => {
    return isAdmin ? "is admin" : " not is admin";
  };
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      render: renderAvatar,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "IsAdmin",
      dataIndex: "isAdmin",
      render: renderIsAdmin,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: renderAction,
    },
    {
      title: "",
      dataIndex: "",
    },
  ];
  const getAllUser = async () => {
    const res = await UserService.getAlluser(user?.access_token);
    return res;
  };
  const queryUsers = useQueryHooks(getAllUser, "product");
  const { data: dataUsers, isLoading: isLoadingUser } = queryUsers;
  console.log(queryUsers);
  const dataTable = dataUsers?.data?.map((user) => {
    return { ...user, key: user._id };
  });
  return (
    <WrapperButtonTable>
      <ButtonComponent
        size={"medium"}
        icon={<PlusOutlined />}
        padding="0 40px"
        position="absolute"
        right="15px"
        top="10px"
        zIndex="1"
      ></ButtonComponent>
      <Spin spinning={isLoadingUser}>
        <Table
          columns={columns}
          dataSource={dataTable}
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </Spin>
    </WrapperButtonTable>
  );
};

export default Create;
