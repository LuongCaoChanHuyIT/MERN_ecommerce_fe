import React, { useEffect, useMemo, useRef, useState } from "react";
import { WrapperButtonTable } from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Image,
  Input,
  message,
  Modal,
  Space,
  Spin,
  Table,
} from "antd";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { deleteProductMany } from "../../services/ProductService";
import { useSelector } from "react-redux";
import { Excel } from "antd-table-saveas-excel";
const TableProduct = ({
  handleDeleteProduct,
  handleDetailProduct,
  handleCreateProduct,
  dataProducts,
  isLoadingProduct,
  setRowSelected,
  dataProductRefetch,
}) => {
  const product = useSelector((state) => state.product);
  const [isOpenDeleteMany, setIsOpenDeleteMany] = useState(false);
  const [isLoadingDeleteMany, setIsLoadingDeleteMany] = useState(false);
  const [listCheck, setListCheck] = useState([]);
  const searchInput = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ""}`}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const renderAction = () => {
    return (
      <>
        <div>
          <DeleteOutlined
            style={{ fontSize: "20px", color: "red" }}
            onClick={handleDeleteProduct}
          />
          <EditOutlined
            style={{ fontSize: "20px", color: "orange" }}
            onClick={handleDetailProduct}
          />
        </div>
      </>
    );
  };
  const renderImage = (data) => {
    return (
      <>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={data}
            style={{
              height: "50px",
              width: "auto",
              objectFit: "cover",
            }}
            alt="avatar"
          />
        </div>
      </>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: renderImage,
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        } else {
          return record.price <= 50;
        }
      },
    },
    {
      title: "rating",
      dataIndex: "rating",
      width: "10%",
    },
    {
      title: "type",
      dataIndex: "type",
      width: "10%",
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
  const newColumnExport = useMemo(() => {
    // eslint-disable-next-line array-callback-return
    const filter = columns.filter((col) => {
      if (
        col.dataIndex !== "Action" &&
        col.dataIndex !== "image" &&
        col.dataIndex !== ""
      ) {
        return col;
      }
    });
    return filter;
    // eslint-disable-next-line no-use-before-define
  }, [columns]);
  const mutationDeleteMany = useMutationHooks((list) => {
    return deleteProductMany(list, product?.access_token);
  });
  const { data } = mutationDeleteMany;
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setListCheck(selectedRowKeys);
    },
  };
  const handleSearch = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };

  useEffect(() => {
    if (data?.status === "SUCCESS") {
      message.success("Xóa các user thành công!");
      dataProductRefetch();
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
  const dataTable = dataProducts?.data?.map((product) => {
    return { ...product, key: product._id };
  });
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataTable, {
        str2Percent: true,
      })
      .saveAs("ExcelProduct.xlsx");
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
          onClick={handleCreateProduct}
        />
        <Spin spinning={isLoadingProduct}>
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

export default TableProduct;
