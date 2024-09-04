import { Button, Image, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
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
import { UploadOutlined } from "@ant-design/icons";
import imgaeDefault from "../../assets/images/account.png";
import { getBase64 } from "../../utils";
import { createUser } from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { useSelector } from "react-redux";
const Create = ({ isOpenCreate, setIsOpenCreate, dataUserRefetch }) => {
  // Set states and on change START============================
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [avatar, setAvatar] = useState();
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setAvatar(file.preview);
    }
  };
  // Set states and on change END=============================
  const user = useSelector((state) => state.user);
  const mutation = useMutationHooks((data) => {
    return createUser(user?.access_token, data);
  });
  const { data, isPending } = mutation;
  useEffect(() => {
    if (data?.status === "OK") {
      dataUserRefetch();
      setIsOpenCreate(false);
    }
  }, [data?.status, dataUserRefetch, setIsOpenCreate]);
  const handleOk = () => {
    if (password === confirmPassword) {
      mutation.mutate({
        name,
        email,
        password,
        confirmPassword,
        phone,
        address,
        avatar,
      });
    }
  };
  const handleCancel = () => {
    setIsOpenCreate(false);
  };
  return (
    <Modal
      title="Tạo sản phẩm"
      width={700}
      open={isOpenCreate}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Spin spinning={isPending}>
        <WrapperContent>
          <WrapperForm>
            <WrapperLableInput>
              <WrapperLabel>Tên sản phẩm:</WrapperLabel>
              <InputFormComponent
                placeholder="Tên người dùng"
                style={{ width: "250px" }}
                value={name}
                typeInput="TEXT"
                onChange={handleOnChangeName}
              />
            </WrapperLableInput>
            <WrapperLableInput>
              <WrapperLabel>Email:</WrapperLabel>
              <InputFormComponent
                style={{ width: "250px" }}
                placeholder="Email"
                value={email}
                typeInput="TEXT"
                onChange={handleOnChangeEmail}
              />
            </WrapperLableInput>
            <WrapperLableInput>
              <WrapperLabel>Mật khẩu:</WrapperLabel>
              <InputFormComponent
                style={{ width: "250px" }}
                value={password}
                placeholder="Mật khẩu"
                typeInput="TEXT"
                onChange={handleOnChangePassword}
              />
            </WrapperLableInput>
            <WrapperLableInput>
              <WrapperLabel>Nhập lại mật khẩu:</WrapperLabel>
              <InputFormComponent
                style={{ width: "250px" }}
                value={confirmPassword}
                typeInput="TEXT"
                placeholder="Nhập lại mật khẩu"
                onChange={handleOnChangeConfirmPassword}
              />
            </WrapperLableInput>
            <WrapperLableInput>
              <WrapperLabel>Số điện thoại:</WrapperLabel>
              <InputFormComponent
                style={{ width: "250px" }}
                value={phone}
                typeInput="TEXT"
                placeholder="Số điện thoại"
                onChange={handleOnChangePhone}
              />
            </WrapperLableInput>
            <WrapperLableInput>
              <WrapperLabel>Địa chỉ:</WrapperLabel>
              <InputFormComponent
                style={{ width: "250px" }}
                value={address}
                typeInput="PARAGRAPH"
                placeholder="Địa chỉ"
                onChange={handleOnChangeAddress}
              />
            </WrapperLableInput>
          </WrapperForm>
          <WrapperFileImage>
            <WrapperLableImage>Hình ảnh:</WrapperLableImage>
            <div>
              <Image
                src={avatar ? avatar : imgaeDefault}
                style={{
                  height: "auto",
                  width: "200px",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            </div>

            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button style={{ width: "250px" }} icon={<UploadOutlined />}>
                Upload
              </Button>
            </WrapperUploadFile>
          </WrapperFileImage>
        </WrapperContent>
      </Spin>
    </Modal>
  );
};

export default Create;
