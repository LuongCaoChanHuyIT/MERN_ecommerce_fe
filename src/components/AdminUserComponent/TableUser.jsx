import React, { useEffect, useMemo, useState } from "react";
import { WrapperButtonTable } from "./style";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { Dropdown, Image, message, Modal, Space, Spin, Table } from "antd";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { deleteUserMany } from "../../services/UserService";
import { useSelector } from "react-redux";
import { Excel } from "antd-table-saveas-excel";
const TableUser = ({
  handleDeleteUser,
  handleDetailUser,
  handleCreateUser,
  dataUsers,
  isLoadingUser,
  setRowSelected,
  dataUserRefetch,
}) => {
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
            onClick={handleDeleteUser}
          />
          <EditOutlined
            style={{ fontSize: "20px", color: "orange" }}
            onClick={handleDetailUser}
          />
        </div>
      </>
    );
  };
  const renderIsAdmin = (isAdmin) => {
    return isAdmin ? "is admin" : " not is admin";
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const user = useSelector((state) => state.user);
  const [isOpenDeleteMany, setIsOpenDeleteMany] = useState(false);
  const [isLoadingDeleteMany, setIsLoadingDeleteMany] = useState(false);
  const [listCheck, setListCheck] = useState([]);
  const newColumnExport = useMemo(() => {
    // eslint-disable-next-line array-callback-return
    const filter = columns.filter((col) => {
      if (
        col.dataIndex !== "Action" &&
        col.dataIndex !== "avatar" &&
        col.dataIndex !== ""
      ) {
        return col;
      }
    });
    return filter;
  }, [columns]);
  const mutationDeleteMany = useMutationHooks((list) => {
    return deleteUserMany(list, user?.access_token);
  });
  const { data } = mutationDeleteMany;
  const dataTable = dataUsers?.data?.map((user) => {
    return { ...user, key: user._id };
  });
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setListCheck(selectedRowKeys);
    },
  };
  useEffect(() => {
    if (data?.status === "SUCCESS") {
      message.success("Xóa các user thành công!");
      dataUserRefetch();
      setIsLoadingDeleteMany(false);
      setIsOpenDeleteMany(false);
    } else if (data?.status === "ERR") {
      message.error("Chưa chọn user nào để xóa!");
      setIsLoadingDeleteMany(false);
      setIsOpenDeleteMany(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);
  const onCloseDeleteMany = () => {
    setIsOpenDeleteMany(false);
  };
  const onOkDeleteMany = () => {
    setIsLoadingDeleteMany(true);
    mutationDeleteMany.mutate(listCheck);
  };
  const handleDeleteMany = () => {
    setIsOpenDeleteMany(true);
  };
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataTable, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };
  const items = [
    {
      key: "1",
      label: <div onClick={handleDeleteMany}>Xóa tất cả</div>,
    },
    {
      key: "2",
      label: <div onClick={exportExcel}>Export excel</div>,
    },
  ];
  //==========================================================================//
  return (
    <>
      <div>
        <Dropdown
          menu={{
            items,
          }}
        >
          <span onClick={(e) => e.preventDefault()}>
            <Space>
              Menu action
              <DownOutlined />
            </Space>
          </span>
        </Dropdown>
      </div>
      <WrapperButtonTable>
        <ButtonComponent
          size={"medium"}
          icon={<PlusOutlined />}
          padding="0 40px"
          position="absolute"
          right="15px"
          top="10px"
          zIndex="1"
          onClick={handleCreateUser}
        ></ButtonComponent>
        <Spin spinning={isLoadingUser}>
          <Table
            rowSelection={{
              ...rowSelection,
            }}
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
      <Modal
        open={isOpenDeleteMany}
        onCancel={onCloseDeleteMany}
        onClose={onCloseDeleteMany}
        onOk={onOkDeleteMany}
      >
        <Spin spinning={isLoadingDeleteMany}>
          Bạn có chắc muốn xóa các người dùng đã chọn?
        </Spin>
      </Modal>
    </>
  );
};

export default TableUser;
