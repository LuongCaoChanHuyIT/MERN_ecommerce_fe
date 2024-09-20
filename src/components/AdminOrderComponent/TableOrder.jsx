import React, { useMemo, useState } from "react";
import { WrapperButtonTable, WrapperTable } from "./style";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Image, Space, Spin } from "antd";

import { Excel } from "antd-table-saveas-excel";
import { convertPrice } from "../../utils";
const TableOrder = ({
  handleDeleteOrder,
  handleDetailOrder,
  handleCreateOrder,
  dataOrders,
  isLoadingOrder,
  setRowSelected,
  dataOrderRefetch,
}) => {
  // const renderAction = () => {
  //   return (
  //     <>
  //       <div>
  //         <DeleteOutlined
  //           style={{ fontSize: "20px", color: "red" }}
  //           onClick={handleDeleteOrder}
  //         />
  //         <EditOutlined
  //           style={{ fontSize: "20px", color: "orange" }}
  //           onClick={handleDetailOrder}
  //         />
  //       </div>
  //     </>
  //   );
  // };

  const renderProducts = (data) => {
    return data.map((item) => (
      <div key={item._id} style={{ display: "flex" }}>
        <Image
          src={item.image}
          style={{
            height: "50px",
            width: "auto",
            objectFit: "cover",
          }}
          alt="avatar"
        />
        <span style={{ padding: "10px" }}>{item.name}</span>
        <span style={{ padding: "10px", marginLeft: "auto" }}>
          {convertPrice(item.price * item.amount)}
        </span>
      </div>
    ));
  };
  const renderShippingAddress = (data) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "auto ",
        }}
      >
        <span>{data.fullName}</span>
        <span>{data.address}</span>
        <span>0{data.phone}</span>
      </div>
    );
  };
  const renderStatusOrder = (data) => {
    return (
      <>{data ? <span>Đã thanh toán</span> : <span>Chưa thanh toán</span>}</>
    );
  };
  const renderDateOrder = (data) => {
    var mydate = new Date(data);

    return <span>{mydate.toLocaleString()}</span>;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "orderItems",
      render: renderProducts,
      width: "50%",
    },
    {
      title: "Thông tin KH",
      dataIndex: "shippingAddress",
      render: renderShippingAddress,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
    },
    {
      title: "Trạng thái hóa đơn",
      dataIndex: "isPaid",
      render: renderStatusOrder,
    },
    {
      title: "Ngày lập hóa đơn",
      dataIndex: "createdAt",
      render: renderDateOrder,
    },
    // {
    //   title: "Action",
    //   dataIndex: "Action",
    //   render: renderAction,
    // },
    {
      title: "",
      dataIndex: "",
    },
  ];

  const [listCheck, setListCheck] = useState([]);

  const newColumnExport = useMemo(() => {
    // eslint-disable-next-line array-callback-return
    const filter = columns.filter((col) => {
      if (col.dataIndex !== "orderItems" && col.dataIndex !== "") {
        return col;
      }
    });
    return filter;
  }, [columns]);

  const dataTable = dataOrders?.data?.map((order) => {
    return { ...order, key: order._id };
  });
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setListCheck(selectedRowKeys);
    },
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
        <Spin spinning={isLoadingOrder}>
          <WrapperTable
            rowSelection={{
              ...rowSelection,
            }}
            size="large"
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
    </>
  );
};

export default TableOrder;
