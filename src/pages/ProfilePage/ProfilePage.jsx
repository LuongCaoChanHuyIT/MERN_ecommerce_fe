/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { UploadOutlined } from "@ant-design/icons";
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Image, message } from "antd";
import { getBase64 } from "../../utils";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const mutation = useMutationHooks((data) => {
    return UserService.updateUser(data.id, data.data, data.access_token);
  });

  const { data, isPending } = mutation;
  // console.log(data);
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    let data = { email, name, phone, address, avatar };
    let id = user?.id;
    let access_token = user?.access_token;
    mutation.mutate({ id, data, access_token });
  };
  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);
  useEffect(() => {
    if (data?.status === "OK") {
      handleGetDetailUser(user?.id, user?.access_token);
      message.success("Cập nhật thành công!");
    }
  }, [data?.status]);
  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  return (
    <div style={{ width: "1270px", margin: "auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <LoadingComponent isLoading={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel>Name:</WrapperLabel>
            <InputFormComponent
              style={{ width: "300px" }}
              value={name}
              type="TEXT"
              onChange={handleOnChangeName}
            />
            <ButtonComponent
              size={"lagre"}
              textButton={"Cập nhật"}
              onClick={handleUpdate}
              width="fit-content"
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel>Email:</WrapperLabel>
            <InputFormComponent
              style={{ width: "300px" }}
              value={email}
              type="TEXT"
              onChange={handleOnChangeEmail}
            />
            <ButtonComponent
              size={"lagre"}
              textButton={"Cập nhật"}
              onClick={handleUpdate}
              width="fit-content"
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel>Phone:</WrapperLabel>
            <InputFormComponent
              style={{ width: "300px" }}
              value={phone}
              type="TEXT"
              onChange={handleOnChangePhone}
            />
            <ButtonComponent
              size={"lagre"}
              textButton={"Cập nhật"}
              onClick={handleUpdate}
              width="fit-content"
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel>Address:</WrapperLabel>
            <InputFormComponent
              style={{ width: "300px" }}
              value={address}
              type="TEXT"
              onChange={handleOnChangeAddress}
            />
            <ButtonComponent
              size={"lagre"}
              textButton={"Cập nhật"}
              onClick={handleUpdate}
              width="fit-content"
            ></ButtonComponent>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel>Avatar:</WrapperLabel>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </WrapperUploadFile>
            {avatar && (
              <Image
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}

            <ButtonComponent
              size={"lagre"}
              textButton={"Cập nhật"}
              onClick={handleUpdate}
              width="fit-content"
            ></ButtonComponent>
          </WrapperInput>
        </WrapperContentProfile>
      </LoadingComponent>
    </div>
  );
};

export default ProfilePage;
