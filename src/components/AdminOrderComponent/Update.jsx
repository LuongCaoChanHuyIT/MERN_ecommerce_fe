import { Button, Drawer, Image, message, Spin } from "antd";
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
import { getBase64 } from "../../utils";
import { UploadOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import imgaeDefault from "../../assets/images/account.png";
import { getDetailUser, updateUser } from "../../services/UserService";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHooks";

const Update = ({
  isOpenUpdate,
  setIsOpenUpdate,
  dataUserRefetch,
  rowSelected,
}) => {
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetailUser = async (rowSelected) => {
    const res = await getDetailUser(rowSelected, user?.access_token);
    if (res?.data) {
      setName(res?.data.name);
      setEmail(res?.data.email);
      setPhone(res?.data.phone);
      setAddress(res?.data.address);
      setAvatar(res?.data.avatar);
      setIsLoading(false);
    }
  };
  const mutation = useMutationHooks((data) => {
    return updateUser(rowSelected, data, user?.access_token);
  });
  const { data, isPending } = mutation;
  const onClose = () => {
    setIsOpenUpdate(false);
  };
  const handleUpdateUser = () => {
    mutation.mutate({ name, email, phone, address, avatar });
  };
  useEffect(() => {
    dataUserRefetch();
    if (data?.status === "SUCCESS") {
      message.success("Cập nhật người dùng thành công!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);
  useEffect(() => {
    if (rowSelected) {
      setIsLoading(true);
      fetchDetailUser(rowSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelected]);
  return (
    <Drawer
      title="Chi tiết người dùng"
      open={isOpenUpdate}
      size="large"
      onClose={onClose}
    >
      <Spin spinning={isLoading || isPending}>
        <WrapperContent>
          <WrapperForm>
            <WrapperLableInput>
              <WrapperLabel>Tên người dùng:</WrapperLabel>
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
                disabled={true}
                onChange={handleOnChangePassword}
              />
            </WrapperLableInput>
            <WrapperLableInput>
              <WrapperLabel>Nhập lại mật khẩu:</WrapperLabel>
              <InputFormComponent
                style={{ width: "250px" }}
                value={confirmPassword}
                typeInput="TEXT"
                disabled={true}
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
        <WrapperButtonGroup>
          <ButtonComponent
            size={"large"}
            textButton={"Cập nhật người dùng"}
            marginTop="20px"
            onClick={handleUpdateUser}
          ></ButtonComponent>
        </WrapperButtonGroup>
      </Spin>
    </Drawer>
  );
};

export default Update;
