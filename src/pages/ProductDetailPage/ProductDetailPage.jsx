import React from "react";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";
import { useNavigate, useParams } from "react-router-dom";
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ padding: "0 120px", backgroundColor: "#efefef" }}>
      <h4>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Trang chủ
        </span>
        - chi tiết sản phẩm
      </h4>
      <div>
        <ProductDetailComponent idProduct={id}></ProductDetailComponent>
      </div>
    </div>
  );
};

export default ProductDetailPage;
