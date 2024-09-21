import React, { useEffect, useState } from "react";
import { Button, Col, Radio, Row, Space } from "antd";
import { WapperContentOrder } from "./style";
import { convertPrice } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { WrapperMethod } from "./style";
import { WrapperIconCheckRadio } from "./style";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { createOrder } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import { deleteProductChecked } from "../../redux/slides/orderSlide";
// import { PayPalButton } from "react-paypal-button-v2";
import { getConfig } from "../../services/PaymentService";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shipping, setShipping] = useState(1);
  const [payment, setPayment] = useState(1);
  const [sdkReady, setSdkReady] = useState(false);
  const [totalPaypal] = useState(order.totalPrice);
  // const [totalPaypal] = useState(String(0.01));

  const mutation = useMutationHooks((data) => {
    return createOrder(user?.access_token, data);
  });

  const { data } = mutation;
  useEffect(() => {
    if (data?.status === "SUCCESS") {
      navigate("/order-success");
      dispatch(deleteProductChecked());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);
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
      taxPrice: order?.taxPrice,
      email: user?.email,
      isPaid: false,
    });
  };
  const onChange = (e) => {
    setPayment(e.target.value);
  };
  const onChangeShippng = (e) => {
    setShipping(e.target.value);
  };
  const addPaypalScript = async () => {
    const { data } = await getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);
  const onSuccessPaypal = (update_time) => {
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
      taxPrice: order?.taxPrice,
      isPaid: true,
      paidsAt: update_time,
    });
  };
  const handleCreateOrder = (data, actions) => {
    // return actions.order
    //   .create({
    //     purchase_units: [
    //       {
    //         amount: {
    //           // value: Math.round(totalPaypal * 0.000041),
    //           value: "0.01",
    //         },
    //       },
    //     ],
    //   })
    //   .then(() => {
    //     // let today = new Date().toLocaleDateString();
    //     // onSuccessPaypal(today);
    //   });
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: Math.round(totalPaypal * 0.000041),
            },
          },
        ],
      })
      .then((orderID) => {
        // let today = new Date().toLocaleDateString();
        // onSuccessPaypal(today);
        return orderID;
      });
  };
  const handleOnApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // console.log(details);

      onSuccessPaypal(details.create_time);
    });
  };
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
                  <Radio.Group onChange={onChangeShippng} value={shipping}>
                    <Space direction="vertical">
                      <WrapperIconCheckRadio value={1}>
                        <span>FAST</span> Giao hàng nhanh
                      </WrapperIconCheckRadio>
                      <WrapperIconCheckRadio value={2}>
                        <span>GOJEK</span> Giao hàng nhanh
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
                  <Radio.Group onChange={onChange} value={payment}>
                    <Space direction="vertical">
                      <WrapperIconCheckRadio value={1}>
                        Thanh toán bằng<span>tiền mặt</span>
                      </WrapperIconCheckRadio>
                      <WrapperIconCheckRadio value={2}>
                        Thanh toán bằng<span>Paypal</span>
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
              {payment === 2 && sdkReady ? (
                <div style={{ width: "100%" }}>
                  {/* <PayPalButton
                    amount={Math.round(totalPaypal * 0.000041)}
                    onSuccess={onSuccessPaypal}
                    onError={(e) => {
                      console.log(e);
                    }}
                  /> */}
                  {/* <PayPalScriptProvider
                    options={{
                      clientId:
                        "Aet5e1ArWxLbp5CF2HMoCdcFmSAulkIQMYcy5So7be1RrWUYPdCWc8moL9vR8HppQLfbX2b9gPQq6f9l",
                    }}
                  >
                    <PayPalButtons
                      createOrder={handleCreateOrder}
                      // onApprove={this.onApprove}
                      // onError={this.onError}
                      // onClick={this.onClick}
                    />
                  </PayPalScriptProvider> */}
                  <PayPalScriptProvider
                    options={{
                      clientId:
                        "Aet5e1ArWxLbp5CF2HMoCdcFmSAulkIQMYcy5So7be1RrWUYPdCWc8moL9vR8HppQLfbX2b9gPQq6f9l",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "horizontal" }}
                      createOrder={handleCreateOrder}
                      onApprove={handleOnApprove}
                    />
                  </PayPalScriptProvider>
                </div>
              ) : (
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
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentPage;
