import React from "react";
import { Col, Image, Row } from "antd";
import { WapperContentOrder } from "./style";
import { convertPrice } from "../../utils";
import { useSelector } from "react-redux";
import { WrapperMethod } from "./style";
import { WrapperProductCol } from "./style";
import { WrapperProduct } from "./style";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  return (
    <div
      style={{
        backgroundColor: "rgb(239, 239, 239)",
        height: "100vh",
      }}
    >
      <div style={{ padding: " 0 120px" }}>
        <span
          style={{ fontSize: "1.4rem", fontWeight: 500, marginTop: "10px" }}
        >
          Đơn hàng đặt thành công
        </span>
        <Row style={{ paddingTop: "20px" }}>
          <Col span={18} style={{ padding: "0 10px", boxSizing: "border-box" }}>
            <WrapperMethod>
              <div style={{ padding: "20px" }}>
                <span style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                  Chọn phương thức giao hàng
                </span>
                <div
                  style={{
                    width: "50%",
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #9dd1ff",
                    background:
                      "linear-gradient(136deg,#eff8ff -85%,#f5faff -1%)",
                  }}
                >
                  <span>FAST</span> Giao hàng nhanh
                </div>
              </div>
            </WrapperMethod>{" "}
            <WrapperMethod>
              <div style={{ padding: "20px" }}>
                <span style={{ fontWeight: "500", fontSize: "1.2rem" }}>
                  Chọn phương thức thanh toán
                </span>
                <div
                  style={{
                    width: "50%",
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #9dd1ff",
                    background:
                      "linear-gradient(136deg,#eff8ff -85%,#f5faff -1%)",
                  }}
                >
                  Thanh toán bằng<span> tiền mặt</span>
                </div>
              </div>
              <WrapperProduct>
                {order?.orderItemSelected?.map((order) => (
                  <Row key={order?.product}>
                    <WrapperProductCol
                      span={8}
                      style={{ justifyContent: "start", paddingLeft: "10px" }}
                    >
                      <Image src={order?.image} style={{ width: "100px" }} />
                      <span style={{ width: "100%", marginLeft: "20px" }}>
                        {order?.name}
                      </span>
                    </WrapperProductCol>
                    <WrapperProductCol span={4}>
                      <span>{convertPrice(order?.price)}VNĐ</span>
                    </WrapperProductCol>
                    <WrapperProductCol span={4}>
                      <span>Số lượng: {order?.amount}</span>
                    </WrapperProductCol>
                    <WrapperProductCol span={4}>
                      <span style={{ color: "red" }}>
                        {convertPrice(order?.price * order?.amount)}
                        VNĐ
                      </span>
                    </WrapperProductCol>
                  </Row>
                ))}
              </WrapperProduct>
            </WrapperMethod>
          </Col>
          <Col span={6}>
            <div
              style={{
                backgroundColor: "#fff",
                width: "100%",

                borderRadius: "4px",
              }}
            >
              <div>
                <WapperContentOrder
                  style={{
                    borderBottom: "3px solid #ccc",
                  }}
                >
                  <span style={{ whiteSpace: "nowrap", width: "100px" }}>
                    Địa chỉ
                  </span>

                  <span style={{ fontWeight: 500, width: "100%" }}>
                    {user?.address}{" "}
                  </span>
                </WapperContentOrder>
                <WapperContentOrder>
                  <span>Tạm tính</span>

                  <span style={{ fontWeight: 500 }}>
                    {convertPrice(order?.provisionalPrice)}vnd
                  </span>
                </WapperContentOrder>
                <WapperContentOrder>
                  <span>Giảm giá</span>
                  <span style={{ fontWeight: 500 }}>
                    -{convertPrice(order?.discountPrice)}vnd
                  </span>
                </WapperContentOrder>
                <WapperContentOrder>
                  <span>Thuế</span>
                  <span style={{ fontWeight: 500 }}>
                    {convertPrice(order?.taxPrice)}vnd (10%)
                  </span>
                </WapperContentOrder>
                <WapperContentOrder>
                  <span>Phí giao hàng</span>
                  <span style={{ fontWeight: 500 }}>
                    {convertPrice(order?.shippingPrice)}vnd
                  </span>
                </WapperContentOrder>
              </div>
              <div style={{ borderTop: "3px solid rgb(239, 239, 239)" }}>
                <WapperContentOrder>
                  <span>Tổng tiền</span>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "1.8rem",
                      color: "#ff4d4f",
                    }}
                  >
                    {convertPrice(order?.totalPrice)}VNĐ
                  </span>
                </WapperContentOrder>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderSuccess;
