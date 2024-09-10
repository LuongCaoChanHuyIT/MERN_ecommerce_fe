import React, { useEffect, useRef, useState } from "react";
import { Button, Image, Input, message, Modal, Select, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import {
  WrapperHeader,
  WrapperButtonTable,
  WrapperLabel,
  WrapperForm,
  WrapperLableInput,
  WrapperUploadFile,
  WrapperFileImage,
  WrapperContent,
  WrapperLableImage,
  WrapperButtonGroup,
} from "./style";
import imgaeDefault from "../../assets/images/account.png";
import { getBase64, renderOption } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import TableComponent from "../TableComponent/TableComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputFormComponent from "../InputFormComponent//InputFormComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import * as ProductSevice from "../../services/ProductService";

// import Highlighter from "react-highlight-words";
const AdminProductComponent = () => {
  //STATE
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [discount, setDiscount] = useState(5);
  const [countInStock, setCountInStock] = useState(1);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState();
  const searchInput = useRef(null);
  const [typeSelect, setTypeSelect] = useState();
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    countInStock: "",
    typeInput: "",
    image: "",
  });
  // INIT==========================
  const mutation = useMutationHooks((data) => {
    return ProductService.createProduct(data);
  });
  const mutationUpdateProduct = useMutationHooks((data) => {
    return ProductService.updateProduct(
      data.id,
      data.access_token,
      data.product
    );
  });
  const mutationDeleteProduct = useMutationHooks((data) => {
    return ProductService.deleteProduct(data);
  });
  const { data: productDelete } = mutationDeleteProduct;
  const { data, isPending } = mutation;
  const { data: productUpdate } = mutationUpdateProduct;

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const queryGetAllProduct = useQueryHooks(getAllProducts, "product");
  const { data: products, isPending: isPendingProduct } = queryGetAllProduct;
  const fetchAllTypeProduct = async () => {
    const res = await ProductSevice.getAllTypeProduct();
    return res?.data;
  };
  const allTypeProduct = useQueryHooks(fetchAllTypeProduct, "type-product");
  const { data: allType } = allTypeProduct;

  //USE EFFECT========================
  useEffect(() => {
    if (productDelete?.status === "OK") {
      setIsShowModalDelete(false);
      message.success("Xóa sản phảm thành công!");
    }
  }, [productDelete?.status]);
  useEffect(() => {
    let data = products?.data?.map((product) => {
      return { ...product, key: product._id };
    });
    setDataTable(data);
  }, [products?.data]);
  useEffect(() => {
    if (data?.message === "SUCCESS") {
      message.success("Thêm sản phẩm thành công!");
      handleCancel();
    } else if (data?.status === "ERROR") {
      message.error("Đã tồn tại sản phẩm này!");
    }
  }, [data?.message, data?.status]);
  useEffect(() => {
    if (rowSelected) {
      setIsLoadingDetail(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);
  useEffect(() => {
    if (productUpdate?.status === "OK") {
      message.success("Cập nhật sản phẩm thành công!");
      setIsOpenDrawer(false);
    } else if (productUpdate?.message === "ERROR") {
      message.error("Cập nhật không thành công!");
    }
  }, [productUpdate?.status, productUpdate?.message]);

  // ONCHANGE=========================
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePrice = (value) => {
    setPrice(value);
  };
  const handleOnChangeCountInStock = (value) => {
    setCountInStock(value);
  };
  const handleOnChangeDescription = (value) => {
    setDescription(value);
  };
  const handleOnChangeDiscount = (value) => {
    setDiscount(value);
  };
  const handleOnChangeType = (value) => {
    setType(value);
  };

  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setImage(file.preview);
  };
  const handleOnChangeNameDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      name: e,
    });
  };
  const handleOnChangePriceDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      price: e,
    });
  };
  const handleOnChangeCountInStockDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      countInStock: e,
    });
  };
  const handleOnChangeDescriptionDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      description: e,
    });
  };
  const handleOnChangeDiscountDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      discount: e,
    });
  };
  const handleOnChangeTypeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      type: e,
    });
  };
  const handleOnChangeImageDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview,
    });
  };
  // FUNCTION==========================

  const onCancelDelete = () => {
    setIsShowModalDelete(false);
  };
  const onOkDelete = () => {
    // console.log(rowSelected);
    mutationDeleteProduct.mutate(rowSelected, {
      onSettled: () => {
        queryGetAllProduct.refetch();
      },
    });
  };
  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetail({
        name: res?.data?.name,
        description: res?.data?.description,
        price: res?.data?.price,
        discount: res?.data?.discount,
        countInStock: res?.data?.countInStock,
        type: res?.data?.type,
        image: res?.data?.image,
      });
      setIsLoadingDetail(false);
    }
  };
  const handleOk = () => {
    mutation.mutate(
      {
        name,
        description,
        price,
        discount,
        countInStock,
        type,
        image,
      },
      {
        onSettled: () => {
          queryGetAllProduct.refetch();
        },
      }
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeletesProduct = () => {
    setIsShowModalDelete(true);
  };
  const handleDetailsProduct = async () => {
    setIsOpenDrawer(true);
  };
  const renderAction = () => {
    return (
      <>
        <div>
          <DeleteOutlined
            style={{ fontSize: "20px", color: "red" }}
            onClick={handleDeletesProduct}
          />
          <EditOutlined
            style={{ fontSize: "20px", color: "orange" }}
            onClick={handleDetailsProduct}
          />
        </div>
      </>
    );
  };
  const handleUpdateProduct = () => {
    let id = rowSelected;
    let access_token = user?.access_token;
    let product = stateProductDetail;
    mutationUpdateProduct.mutate(
      {
        id,
        access_token,
        product,
      },
      {
        onSettled: () => {
          queryGetAllProduct.refetch();
        },
      }
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
  const handleSearch = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
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
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  const handleChangeSelect = (value) => {
    if (value !== "add_type") {
      setType(value);
      setStateProductDetail({ ...stateProductDetail, type: value });
    } else {
      setTypeSelect(value);
    }
  };

  // ARRAY VALUE========================
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
      sorter: (a, b) => a.name.lenght - b.name.lenght,
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
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <WrapperButtonTable>
        <ButtonComponent
          size={"medium"}
          icon={<PlusOutlined />}
          padding="0 40px"
          position="absolute"
          right="15px"
          top="10px"
          zIndex="1"
          onClick={() => setIsModalOpen(true)}
        ></ButtonComponent>
        <TableComponent
          columns={columns}
          data={dataTable}
          isLoading={isPendingProduct}
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </WrapperButtonTable>
      <Modal
        title="Tạo sản phẩm"
        width={700}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <LoadingComponent isLoading={isPending}>
          <WrapperContent>
            <WrapperForm>
              <WrapperLableInput>
                <WrapperLabel>Tên sản phẩm:</WrapperLabel>
                <InputFormComponent
                  placeholder="Tên sản phẩm"
                  style={{ width: "250px" }}
                  value={name}
                  typeInput="TEXT"
                  onChange={handleOnChangeName}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Mô tả:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  placeholder="Mô tả sản phẩm"
                  value={description}
                  typeInput="PARAGRAPH"
                  onChange={handleOnChangeDescription}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Giá:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={price}
                  typeInput="NUMBER"
                  onChange={handleOnChangePrice}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Giảm giá:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={discount}
                  typeInput="NUMBER"
                  onChange={handleOnChangeDiscount}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>SL SP kho:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={countInStock}
                  typeInput="NUMBER"
                  onChange={handleOnChangeCountInStock}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Loại sản phẩm:</WrapperLabel>
                <Select
                  name="type"
                  defaultValue="lucy"
                  style={{
                    width: 250,
                  }}
                  onChange={handleChangeSelect}
                  options={renderOption(allType)}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                {typeSelect === "add_type" && (
                  <>
                    <WrapperLabel>Nhập loại SP:</WrapperLabel>
                    <InputFormComponent
                      style={{ width: "250px" }}
                      value={type}
                      typeInput="TEXT"
                      onChange={handleOnChangeType}
                    />
                  </>
                )}
              </WrapperLableInput>
            </WrapperForm>
            <WrapperFileImage>
              <WrapperLableImage>Hình ảnh:</WrapperLableImage>
              <div>
                <Image
                  src={image ? image : imgaeDefault}
                  style={{
                    height: "auto",
                    width: "200px",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />
              </div>

              <WrapperUploadFile onChange={handleOnChangeImage} maxCount={1}>
                <Button style={{ width: "250px" }} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </WrapperUploadFile>
            </WrapperFileImage>
          </WrapperContent>
        </LoadingComponent>
      </Modal>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <LoadingComponent isLoading={isLoadingDetail}>
          <WrapperContent>
            <WrapperForm>
              <WrapperLableInput>
                <WrapperLabel>Tên sản phẩm:</WrapperLabel>
                <InputFormComponent
                  placeholder="Tên sản phẩm"
                  style={{ width: "250px" }}
                  value={stateProductDetail.name}
                  typeInput="TEXT"
                  onChange={handleOnChangeNameDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Mô tả:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  placeholder="Mô tả sản phẩm"
                  value={stateProductDetail.description}
                  typeInput="PARAGRAPH"
                  onChange={handleOnChangeDescriptionDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Giá:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={stateProductDetail.price}
                  typeInput="NUMBER"
                  onChange={handleOnChangePriceDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Giảm giá:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={stateProductDetail.discount}
                  typeInput="NUMBER"
                  onChange={handleOnChangeDiscountDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>SL SP kho:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={stateProductDetail.countInStock}
                  typeInput="NUMBER"
                  onChange={handleOnChangeCountInStockDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Loại sản phẩm:</WrapperLabel>
                <Select
                  name="type"
                  defaultValue="lucy"
                  style={{
                    width: 250,
                  }}
                  onChange={handleChangeSelect}
                  options={renderOption(allType)}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                {typeSelect === "add_type" && (
                  <>
                    <WrapperLabel>Nhập loại SP:</WrapperLabel>
                    <InputFormComponent
                      style={{ width: "250px" }}
                      value={type}
                      typeInput="TEXT"
                      onChange={handleOnChangeTypeDetail}
                    />
                  </>
                )}
              </WrapperLableInput>
            </WrapperForm>
            <WrapperFileImage>
              <WrapperLableImage>Hình ảnh:</WrapperLableImage>
              <div>
                <Image
                  src={
                    stateProductDetail.image
                      ? stateProductDetail.image
                      : imgaeDefault
                  }
                  style={{
                    height: "auto",
                    width: "200px",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />
              </div>

              <WrapperUploadFile
                onChange={handleOnChangeImageDetail}
                maxCount={1}
              >
                <Button style={{ width: "250px" }} icon={<UploadOutlined />}>
                  Upload
                </Button>
              </WrapperUploadFile>
            </WrapperFileImage>{" "}
          </WrapperContent>
          <WrapperButtonGroup>
            <ButtonComponent
              size={"large"}
              textButton={"Cập nhật sản phẩm"}
              marginTop="20px"
              onClick={handleUpdateProduct}
            ></ButtonComponent>
          </WrapperButtonGroup>
        </LoadingComponent>
      </DrawerComponent>
      <Modal
        title="Xóa sản phẩm"
        open={isShowModalDelete}
        onCancel={onCancelDelete}
        onOk={onOkDelete}
      >
        <span>Bạn có muốn xóa sản phẩm ?</span>
      </Modal>
    </div>
  );
};

export default AdminProductComponent;
