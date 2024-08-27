import React, { Fragment } from "react";
import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// Components
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
function App() {
  // const fetchApi = async () => {
  //   const res = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/product/getAll`
  //   );
  //   return res;
  // };
  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  // console.log(query);
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
