import React from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import accountImage from "../../assets/images/account.png";
const SignInPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.53)",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          backgroundColor: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1 style={{ margin: 0 }}> Xin chào,</h1>
          <p style={{ margin: "5px 0 20px" }}>Đăng nhập và tạo tài khoản</p>
          <InputFormComponent
            placeholder="abc@gmail.com"
            style={{ marginBottom: "10px" }}
          />
          <InputFormComponent placeholder="password" />
          <div style={{ margin: "10px" }}></div>
          <ButtonComponent size="large" textButton="Đăng nhập" />
          <div style={{ marginTop: "auto" }}>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
            <p>
              Chưa có tài khoản? 
              <WrapperTextLight>Tạo tài khoản</WrapperTextLight>
            </p>
          </div>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={accountImage}
            preview={false}
            alt="image-logo"
            height="203px"
            width="203px"
          />
          <h4>Mua sắm tại Tiki</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
