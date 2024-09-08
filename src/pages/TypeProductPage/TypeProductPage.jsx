import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import { getProductType } from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
const TypeProductPage = () => {
  const { state } = useLocation();
  const searchProduct = useSelector((state) => state.product.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [products, setProducts] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 4,
    total: 1,
  });
  const fetchProductType = async (type, page, limit) => {
    console.log(type, page, limit);
    const res = await getProductType(type, page, limit);
    if (res?.status === "OK") {
      setProducts(res?.data);
      setPaginate({ ...paginate, total: res?.totalPage });
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, paginate.page, paginate.limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, paginate.page, paginate.limit]);

  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current - 1, limit: pageSize });
  };
  console.log(paginate.total);
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
            {products
              ?.filter((pro) => {
                if (searchDebounce === "") {
                  return pro;
                } else if (
                  pro?.name
                    .toLowerCase()
                    ?.includes(searchDebounce.toLowerCase())
                ) {
                  return pro;
                }
              })
              .map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    discount={product.discount}
                    selled={product.selled}
                    id={product._id}
                  ></CardComponent>
                );
              })}
          </WrapperProducts>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Pagination
              defaultCurrent={paginate?.page + 1}
              total={paginate?.total}
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
