/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { Image } from "antd";
import accountImage from "../../assets/images/account.png";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutationHooks((data) => {
    return UserService.loginUser(data);
  });

  const { data, isPending } = mutation;
  useEffect(() => {
    if (data?.status === "OK") {
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [data?.status]);
  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnChangePassword = (value) => {
    setPassword(value);
  };
  const handleSignIn = () => {
    mutation.mutate({ email, password });
  };
  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

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
            value={email}
            typeInput={"TEXT"}
            style={{ marginBottom: "10px" }}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative" }}>
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
              typeInput="TEXT"
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>

          {data?.status === "ERR" && (
            <span style={{ color: "red", marginTop: "10px" }}>
              {data?.message}
            </span>
          )}
          <div style={{ margin: "10px" }}></div>
          <LoadingComponent isLoading={isPending}>
            <ButtonComponent
              size="large"
              textButton="Đăng nhập"
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              width="100%"
            />
          </LoadingComponent>
          <div style={{ marginTop: "auto" }}>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
            <p>
              Chưa có tài khoản?
              <WrapperTextLight onClick={handleNavigateSignUp}>
                Tạo tài khoản
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

export default SignInPage;
