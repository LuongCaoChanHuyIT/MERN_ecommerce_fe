import React, { useEffect, useState } from "react";
import TypeProductComponent from "../../components/TypeProductComponent/TypeProductComponent";
import { WrapperTypeProduct, WrapperButtonMore } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.png";
import slider2 from "../../assets/images/slider2.png";
import slider3 from "../../assets/images/slider3.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductSevice from "../../services/ProductService";
import { useSelector } from "react-redux";
import { Col, Row, Spin } from "antd";
import { useDebounce } from "../../hooks/useDebounce";
const HomePage = () => {
  const [typeProduct, setTypeProduct] = useState([]);
  const searchProduct = useSelector((state) => state.product.search);
  const [limit, setLimit] = useState(4);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [isLoading, setIsLoading] = useState(false);
  const fetchProductAll = async (context) => {
    let limit = context?.queryKey && context?.queryKey[1];
    let search = context?.queryKey && context?.queryKey[2];
    const res = await ProductSevice.getAllProduct(search, limit);
    return res;
  };
  const { data: products, isLoading: pending } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    placeholderData: (prev) => prev,
    retry: 1,
    retryDelay: 1000,
  });
  const fetchAllTypeProduct = async () => {
    const res = await ProductSevice.getAllTypeProduct();
    if (res?.status === "SUCCESS") {
      setTypeProduct(res?.data);
    }
  };
  useEffect(() => {
    fetchAllTypeProduct();
  }, []);
  useEffect(() => {
    setIsLoading(false);
  }, [products]);
  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {typeProduct.map((item, i) => {
            return (
              <TypeProductComponent name={item} key={i}></TypeProductComponent>
            );
          })}
        </WrapperTypeProduct>
      </div>
      <div
        id="container"
        style={{ backgroundColor: "#efefef", padding: "0 120px" }}
      >
        <SliderComponent
          arrImage={[slider1, slider2, slider3]}
        ></SliderComponent>
        <Spin spinning={pending || isLoading}>
          <Row
            style={{
              marginTop: "50px",
            }}
          >
            {products?.data?.map((product) => {
              return (
                <Col
                  key={product._id}
                  style={{ padding: "3px" }}
                  span={4}
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
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <WrapperButtonMore
            textButton="Xem thêm"
            size="lagre"
            disabled={products?.total === products?.data?.length}
            onClick={() => {
              setLimit((prev) => prev + 4);
              setIsLoading(true);
            }}
          ></WrapperButtonMore>
        </div>
      </div>
    </>
  );
};

export default HomePage;
