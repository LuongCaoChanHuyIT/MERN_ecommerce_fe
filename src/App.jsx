import React, { Fragment, useEffect } from "react";
import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import * as UserService from "./services/UserService";
import * as OrderService from "./services/OrderService";
import * as ProductService from "./services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import { handleDecoded } from "./utils";
import { jwtDecode } from "jwt-decode";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  });
  const handleGetDetailUser = async (id, token) => {
    let strongeRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(strongeRefreshToken);
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();
      let strongeRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(strongeRefreshToken);
      const decodeRefreshToken = jwtDecode(refreshToken);
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodeRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken();
          config.headers["token"] = `Beare ${data?.access_token}`;
        }
      }
      return config;
    },
    async function (error) {
      return Promise.reject(error);
    }
  );
  OrderService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Beare ${data?.access_token}`;
      }
      return config;
    },
    async function (error) {
      return Promise.reject(error);
    }
  );
  ProductService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Beare ${data?.access_token}`;
      }
      return config;
    },
    async function (error) {
      return Promise.reject(error);
    }
  );

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, i) => {
            const Page = route.page;
            const isCheckAuth = !route.isPrivate || user.isAdmin;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;

            return (
              <Route
                key={i}
                path={isCheckAuth ? route.path : ""}
                element={
                  <>
                    <Layout>
                      <Page></Page>
                    </Layout>
                  </>
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
