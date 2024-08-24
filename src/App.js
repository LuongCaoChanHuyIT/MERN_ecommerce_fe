import React, { Fragment } from "react";
import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
function App() {
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
