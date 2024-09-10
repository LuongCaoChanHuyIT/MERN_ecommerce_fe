import { message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperForm,
  WrapperLabel,
  WrapperLableInput,
} from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { updateUser } from "../../services/UserService";
import { useSelector } from "react-redux";

const UpdateInfoUser = ({ isOpenCreate, setIsOpenCreate }) => {
  const user = useSelector((state) => state.user);
  // Set states and on change START============================
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const handleOnChangeName = (value) => {
    setName(value);
  };
  const handleOnChangePhone = (value) => {
    setPhone(value);
  };
  const handleOnChangeAddress = (value) => {
    setAddress(value);
  };
  // Set states and on change END=============================
  const handleCancel = () => {
    setIsOpenCreate(false);
  };
  const mutation = useMutationHooks((data) => {
    return updateUser(user?.id, data, user?.access_token);
  });
  const { data, isPending } = mutation;
  useEffect(() => {
    if (data?.status === "OK") {
      message.success("Cập nhật người dùng thành công!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);
  const handleOk = () => {
    mutation.mutate({ name, phone, address });
  };
  useEffect(() => {
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
  }, [user]);
  return (
    <Modal
      title="Tạo sản phẩm"
      width={500}
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
        </WrapperContent>
      </Spin>
    </Modal>
  );
};

export default UpdateInfoUser;
