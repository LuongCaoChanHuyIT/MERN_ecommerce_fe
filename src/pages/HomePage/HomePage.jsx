import React from "react";
import TypeProductComponent from "../../components/TypeProductComponent/TypeProductComponent";
import {
  WrapperTypeProduct,
  WrapperButtonMore,
  WrapperProducts,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.png";
import slider2 from "../../assets/images/slider2.png";
import slider3 from "../../assets/images/slider3.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductSevice from "../../services/ProductService";
const HomePage = () => {
  const arrType = ["TV", "Laptop"];

  const fetchProductAll = async () => {
    const res = await ProductSevice.getAllProduct();
    return res.data;
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });
  console.log(products);

  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arrType.map((item, i) => {
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
        <WrapperProducts>
          {products?.map((product) => {
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
              ></CardComponent>
            );
          })}
        </WrapperProducts>
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
          ></WrapperButtonMore>
        </div>
      </div>
    </>
  );
};

export default HomePage;
