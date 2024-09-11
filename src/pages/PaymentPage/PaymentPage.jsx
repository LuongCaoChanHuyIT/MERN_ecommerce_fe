import React, { useState } from "react";
import { Button, Col, Radio, Row, Space } from "antd";
import { WapperContentOrder } from "./style";
import { convertPrice } from "../../utils";
import { useSelector } from "react-redux";
import { WrapperMethod } from "./style";
import { WrapperIconCheckRadio } from "./style";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { createOrder } from "../../services/OrderService";
const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState(1);
  const mutation = useMutationHooks((data) => {
    return createOrder(user?.access_token, data);
  });
  const { data } = mutation;
  console.log(data);
  const handlePay = () => {
    mutation.mutate({
      orderItems: order?.orderItemSelected,
      fullname: user?.name,
      address: user?.address,
      phone: user?.phone,
      paymentMethod: "payment",
      itemsPrice: order?.provisionalPrice,
      shippingPrice: order?.shippingPrice,
      totalPrice: order?.totalPrice,
      user: user?.id,
    });
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  console.log(order, user);
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
          Thanh toán
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
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <WrapperIconCheckRadio value={1}>
                        <span>FAST</span> Giao hàng nhanh
                      </WrapperIconCheckRadio>
                      <WrapperIconCheckRadio value={2}>
                        <span>GOJEK</span> Giao hàng nhanh{" "}
                      </WrapperIconCheckRadio>
                    </Space>
                  </Radio.Group>
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
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                      <WrapperIconCheckRadio value={1}>
                        Thanh toán bằng<span>tiền mặt</span>
                      </WrapperIconCheckRadio>
                    </Space>
                  </Radio.Group>
                </div>
              </div>
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
                    <span
                      style={{
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontSize: "0.9rem",
                        color: "blue",
                      }}
                    >
                      Thay đổi
                    </span>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button
                type="primary"
                danger
                style={{
                  fontSize: "1.6rem",
                  padding: "25px 60px",
                  width: "100%",
                }}
                onClick={handlePay}
              >
                Mua hàng
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentPage;
