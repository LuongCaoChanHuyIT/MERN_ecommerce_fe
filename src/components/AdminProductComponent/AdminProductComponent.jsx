import React, { useEffect, useState } from "react";
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
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputFormComponent from "../InputFormComponent//InputFormComponent";
import { Button, Image, message, Modal } from "antd";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import imgaeDefault from "../../assets/images/account.png";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import { useQueryHooks } from "../../hooks/useQueryHooks";
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
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    countInStock: "",
    type: "",
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
  const { data, isPending } = mutation;
  const { data: productUpdate } = mutationUpdateProduct;

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const queryGetAllProduct = useQueryHooks(getAllProducts, "product");
  const { data: products, isPending: isPendingProduct } = queryGetAllProduct;

  //USE EFFECT========================
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
    } else if (productUpdate?.message === "ERROR") {
      message.error("Cập nhật không thành công!");
    }
  }, [productUpdate?.status, productUpdate?.message]);
  // ONCHANGE=========================
  // PRODUCT==========================
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
    mutation.mutate({
      name,
      description,
      price,
      discount,
      countInStock,
      type,
      image,
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeletesProduct = () => {
     
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
  // ARRAY VALUE========================
  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: renderImage,
    },
    {
      title: "Name",
      dataIndex: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "rating",
      dataIndex: "rating",
    },
    {
      title: "type",
      dataIndex: "type",
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
          top="30px"
          zIndex="1"
          onClick={() => setIsModalOpen(true)}
        ></ButtonComponent>
        <div style={{ marginTop: "20px" }}>
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
        </div>
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
                  type="TEXT"
                  onChange={handleOnChangeName}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Mô tả:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  placeholder="Mô tả sản phẩm"
                  value={description}
                  type="PARAGRAPH"
                  onChange={handleOnChangeDescription}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Giá:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={price}
                  type="NUMBER"
                  onChange={handleOnChangePrice}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Giảm giá:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={discount}
                  type="NUMBER"
                  onChange={handleOnChangeDiscount}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>SL SP kho:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={countInStock}
                  type="NUMBER"
                  onChange={handleOnChangeCountInStock}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Loại sản phẩm:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={type}
                  type="TEXT"
                  onChange={handleOnChangeType}
                />
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
                  type="TEXT"
                  onChange={handleOnChangeNameDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Mô tả:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  placeholder="Mô tả sản phẩm"
                  value={stateProductDetail.description}
                  type="PARAGRAPH"
                  onChange={handleOnChangeDescriptionDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Giá:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={stateProductDetail.price}
                  type="NUMBER"
                  onChange={handleOnChangePriceDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Giảm giá:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={stateProductDetail.discount}
                  type="NUMBER"
                  onChange={handleOnChangeDiscountDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>SL SP kho:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={stateProductDetail.countInStock}
                  type="NUMBER"
                  onChange={handleOnChangeCountInStockDetail}
                />
              </WrapperLableInput>
              <WrapperLableInput>
                <WrapperLabel>Loại sản phẩm:</WrapperLabel>
                <InputFormComponent
                  style={{ width: "250px" }}
                  value={stateProductDetail.type}
                  type="TEXT"
                  onChange={handleOnChangeTypeDetail}
                />
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
    </div>
  );
};

export default AdminProductComponent;
