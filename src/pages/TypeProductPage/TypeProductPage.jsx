import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";

const TypeProductPage = () => {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };
  return (
    <div
      style={{
        padding: "0 120px",
        background: "#efefef",
      }}
    >
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
        <WrapperNavbar span={4}>
          <NavbarComponent></NavbarComponent>
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
          </WrapperProducts>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Pagination
              defaultCurrent={2}
              total={500}
              onChange={onChange}
              style={{ margin: " 30px 0" }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
