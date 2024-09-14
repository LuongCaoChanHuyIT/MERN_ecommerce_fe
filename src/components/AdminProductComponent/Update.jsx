import { Button, Drawer, Image, message, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperButtonGroup,
  WrapperContent,
  WrapperFileImage,
  WrapperForm,
  WrapperLabel,
  WrapperLableImage,
  WrapperLableInput,
  WrapperUploadFile,
} from "./style";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import { UploadOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { getBase64, renderOption } from "../../utils";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as ProductService from "../../services/ProductService";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import { useSelector } from "react-redux";
import imgaeDefault from "../../assets/images/account.png";
const Update = ({
  isOpenUpdate,
  setIsOpenUpdate,
  rowSelected,
  dataProductRefetch,
}) => {
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    countInStock: "",
    type: "",
    image: "",
  });
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
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [typeSelect, setTypeSelect] = useState();
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res?.data;
  };
  const allTypeProduct = useQueryHooks(fetchAllTypeProduct, "type-product");
  const { data: allType } = allTypeProduct;
  const mutation = useMutationHooks((data) => {
    return ProductService.updateProduct(rowSelected, user?.access_token, data);
  });
  const { data, isPending } = mutation;

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
      setIsLoading(false);
    }
  };
  const handleUpdateProduct = () => {
    mutation.mutate({ ...stateProductDetail });
  };
  const handleChangeSelect = (value) => {
    if (value !== "add_type") {
      setStateProductDetail({ ...stateProductDetail, type: value });
    } else {
      setTypeSelect(value);
    }
  };
  useEffect(() => {
    dataProductRefetch();
    if (data?.status === "SUCCESS") {
      message.success("Cập nhật sản phẩm thành công!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);
  useEffect(() => {
    if (rowSelected) {
      setIsLoading(true);
      fetchGetDetailsProduct(rowSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelected]);
  return (
    <Drawer
      title="Chi tiết sản phẩm"
      open={isOpenUpdate}
      size="large"
      onClose={() => setIsOpenUpdate(false)}
    >
      <Spin spinning={isPending || isLoading}>
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
                    value={stateProductDetail.type}
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
      </Spin>
    </Drawer>
  );
};

export default Update;
