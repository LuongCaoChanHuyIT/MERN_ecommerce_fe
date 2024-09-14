import { Button, Image, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {
  WrapperContent,
  WrapperFileImage,
  WrapperForm,
  WrapperLabel,
  WrapperLableImage,
  WrapperLableInput,
  WrapperUploadFile,
} from "./style";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import { getBase64, renderOption } from "../../utils";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as ProductService from "../../services/ProductService";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import imgaeDefault from "../../assets/images/account.png";
import { UploadOutlined } from "@ant-design/icons";
const Create = ({ isOpenCreate, setIsOpenCreate, dataProductRefetch }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [discount, setDiscount] = useState(5);
  const [countInStock, setCountInStock] = useState(1);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [typeSelect, setTypeSelect] = useState();
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
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res?.data;
  };
  const allTypeProduct = useQueryHooks(fetchAllTypeProduct, "type-product");
  const { data: allType } = allTypeProduct;
  const mutation = useMutationHooks((data) => {
    return ProductService.createProduct(data);
  });
  const { data, isPending } = mutation;
  useEffect(() => {
    if (data?.status === "SUCCESS") {
      dataProductRefetch();
      setIsOpenCreate(false);
      message.success("Thêm sản phẩm thành công!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);
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
    setIsOpenCreate(false);
  };
  const handleChangeSelect = (value) => {
    if (value !== "add_type") {
      setType(value);
    } else {
      setTypeSelect(value);
    }
  };
  return (
    <Modal
      title="Tạo sản phẩm"
      width={700}
      open={isOpenCreate}
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
                defaultValue={allType ? allType[0] : ""}
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
  );
};

export default Create;
