/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import accountImage from "../../assets/images/account.png";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as MessageComponent from "../../components/MessageComponent/MessageComponent";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mutation = useMutationHooks((data) => {
    return UserService.signUpUser(data);
  });
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
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
  const { data, isPending, isError, isSuccess } = mutation;
  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
  };
  useEffect(() => {
    if (isSuccess) {
      MessageComponent.success();
      handleNavigateSignIn();
    } else if (isError) {
      MessageComponent.error();
    }
  }, [isError, isSuccess]);
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
            value={email}
            handleOnChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              handleOnChange={handleOnChangePassword}
            />
          </div>
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              placeholder="confirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              handleOnChange={handleOnChangeConfirmPassword}
            />
          </div>{" "}
          {data?.status === "ERR" && (
            <span style={{ color: "red", marginTop: "10px" }}>
              {" "}
              {data?.message}
            </span>
          )}
          <div style={{ margin: "10px" }}></div>
          <LoadingComponent isLoading={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword}
              size="large"
              textButton="Đăng ký"
              onClick={handleSignUp}
            />
          </LoadingComponent>
          <div style={{ marginTop: "auto" }}>
            <p>
              Đã có tài khoản?
              <WrapperTextLight onClick={handleNavigateSignIn}>
                Đăng nhập
              </WrapperTextLight>
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
          <h4>Mua sắm tại Ecom</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
