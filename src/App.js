import React, { Fragment, useEffect } from "react";
import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
// Components
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
function App() {
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const res = await axios.get(
      `${process.env.REACT_API_URL_BACKEND}/product/getAllProduct`
    );
    console.log(res);
  };
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, i) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={i}
                path={route.path}
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
