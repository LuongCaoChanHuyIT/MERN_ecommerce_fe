import React, { useEffect, useState } from "react";
import {
  WrapperHeader,
  WrapperButtonTable,
  WrapperLabel,
  WrapperForm,
  WrapperLableInput,
  WrapperUploadFile,
} from "./style";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import InputFormComponent from "../InputFormComponent//InputFormComponent";
import { Button, Image, InputNumber, message, Modal } from "antd";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { useDispatch } from "react-redux";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const AdminProductComponent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [discount, setDiscount] = useState(5);
  const [countInStock, setCountInStock] = useState(1);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mutation = useMutationHooks((data) => {
    return ProductService.createProduct(data);
  });
  const { data, isPending } = mutation;
  useEffect(() => {
    if (data?.message === "SUCCESS") {
      message.success("Thêm sản phẩm thành công!");
      handleCancel();
    } else if (data?.status === "ERROR") {
      message.error("Đã tồn tại sản phẩm này!");
    }
  }, [data?.message]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  const handleOk = () => {
    // mutation.mutate({
    //   name,
    //   description,
    //   price,
    //   discount,
    //   countInStock,
    //   type,
    //   image,
    // });
    console.log(name, description, price, discount, countInStock, type, image);
  };
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
          <TableComponent />
        </div>
      </WrapperButtonTable>
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <LoadingComponent isLoading={isPending}>
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
              {/* <InputNumber
                min={1}
                max={10}
                defaultValue={3}
                onChange={handleOnChangePrice}
              /> */}
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
            <WrapperLableInput>
              <WrapperLabel>Hình ảnh:</WrapperLabel>
              <WrapperUploadFile onChange={handleOnChangeImage} maxCount={1}>
                <Button style={{ width: "250px" }} icon={<UploadOutlined />}>
                  Upload
                </Button>
                {image && (
                  <Image
                    src={image}
                    style={{
                      position: "absolute",
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      left: "100px",
                      // right: "100xp",
                      bottom: "100px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </WrapperLableInput>
          </WrapperForm>
        </LoadingComponent>
      </Modal>
    </div>
  );
};

export default AdminProductComponent;
