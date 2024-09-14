import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row, Spin } from "antd";
import { WrapperNavbar } from "./style";
import { useLocation } from "react-router-dom";
import { getProductType } from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import * as ProductSevice from "../../services/ProductService";
const TypeProductPage = () => {
  const { state } = useLocation();
  // const param = useParams();
  const searchProduct = useSelector((state) => state.product.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 4,
    total: 1,
  });
  const fetchProductType = async (type, page, limit) => {
    const res = await getProductType(type, page, limit);
    if (res?.status === "SUCCESS") {
      setProducts(res?.data);
      setIsLoading(false);
      setPaginate({ ...paginate, total: res?.totalPage });
    }
  };
  useEffect(() => {
    console.log(state);
    if (state) {
      setIsLoading(true);
      fetchProductType(state, paginate.page, paginate.limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, paginate.page, paginate.limit]);
  const onChange = (current, pageSize) => {
    setPaginate({ ...paginate, page: current - 1, limit: pageSize });
  };
  const getProductOptions = async (option) => {
    const res = await ProductSevice.getProductOption(state, option, 0, 4);
    if (res?.status === "SUCCESS") {
      setProducts(res?.data);
      setIsLoading(false);
    }
  };
  const handleGetForPrice = (option) => {
    setIsLoading(true);
    getProductOptions(option);
  };

  return (
    <div
      style={{
        padding: "0 120px",
        background: "#efefef",
      }}
    >
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
        <WrapperNavbar span={6}>
          <NavbarComponent
            handleGetForPrice={handleGetForPrice}
          ></NavbarComponent>
        </WrapperNavbar>
        <Col span={18}>
          <Spin spinning={isLoading}>
            <Row>
              {products
                // eslint-disable-next-line array-callback-return
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
                    <Col
                      style={{ padding: "3px" }}
                      span={6}
                      xs={{
                        order: 1,
                      }}
                      sm={{
                        order: 2,
                      }}
                      md={{
                        order: 3,
                      }}
                      lg={{
                        order: 4,
                      }}
                    >
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
                    </Col>
                  );
                })}
            </Row>
          </Spin>

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
