import React from "react";
import { Button, Checkbox, Col, Image, InputNumber, Row } from "antd";
import {
  WapperContentOrder,
  WrapperProduct,
  WrapperProductCol,
  WrapperTitleCol,
} from "./style";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAmount,
  removeOrderProduct,
  changeCheck,
} from "../../redux/slides/orderSlide";
const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const onChange = (value, id) => {
    console.log(value, id);
    dispatch(changeAmount({ value, id }));
  };
  const handleDeleteOrder = (id) => {
    console.log(id);
    dispatch(removeOrderProduct({ idProduct: id }));
  };
  const onChangeCheck = (e, id) => {
    console.log(`checked = ${e.target.checked}`);
    let check = e.target.checked;
    dispatch(changeCheck({ value: check, id }));
  };
  console.log(order);
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
          Giỏ hàng
        </span>
        <Row style={{ paddingTop: "20px" }}>
          <Col span={18} style={{ padding: "0 10px" }}>
            <WrapperTitleCol>
              <Row>
                <WrapperProductCol
                  span={8}
                  style={{ justifyContent: "start", paddingLeft: "10px" }}
                >
                  <Checkbox style={{ marginRight: "10px" }}></Checkbox>
                  <span>Tất cả</span>
                  <span>({order?.orderItems?.length} sản phẩm)</span>
                </WrapperProductCol>
                <WrapperProductCol span={4}>
                  <span>Đơn giá</span>
                </WrapperProductCol>
                <WrapperProductCol span={4}>
                  <span>Số lượng</span>
                </WrapperProductCol>
                <WrapperProductCol span={4}>
                  <span>Thành tiền</span>
                </WrapperProductCol>
                <WrapperProductCol span={4}>
                  <DeleteOutlined />
                </WrapperProductCol>
              </Row>
            </WrapperTitleCol>
            <WrapperProduct>
              {order?.orderItems?.map((order) => (
                <Row>
                  <WrapperProductCol
                    span={8}
                    style={{ justifyContent: "start", paddingLeft: "10px" }}
                  >
                    <Checkbox
                      checked={order?.checked}
                      onChange={(e) => onChangeCheck(e, order?.product)}
                      style={{ marginRight: "10px" }}
                    ></Checkbox>
                    <Image src={order?.image} width={100} height={100} />
                    <span>{order?.name}</span>
                  </WrapperProductCol>
                  <WrapperProductCol span={4}>
                    <span>{order?.price}d</span>
                  </WrapperProductCol>
                  <WrapperProductCol span={4}>
                    <InputNumber
                      min={1}
                      defaultValue={order?.amount}
                      onChange={(e) => onChange(e, order?.product)}
                      style={{ fontSize: "1.2rem" }}
                    />
                  </WrapperProductCol>
                  <WrapperProductCol span={4}>
                    <span style={{ color: "red" }}>
                      {order?.price * order?.amount}d
                    </span>
                  </WrapperProductCol>
                  <WrapperProductCol span={4}>
                    <DeleteOutlined
                      onClick={() => handleDeleteOrder(order?.product)}
                    />
                  </WrapperProductCol>
                </Row>
              ))}
            </WrapperProduct>
          </Col>
          <Col span={6} style={{ padding: "0 10px" }}>
            <div
              style={{
                backgroundColor: "#fff",
                width: "100%",
                height: "200px",
                borderRadius: "4px",
              }}
            >
              <div>
                <WapperContentOrder>
                  <span>Tạm tính</span>
                  <span style={{ fontWeight: 500 }}>0</span>
                </WapperContentOrder>
                <WapperContentOrder>
                  <span>Giảm giá</span>
                  <span style={{ fontWeight: 500 }}>0</span>
                </WapperContentOrder>
                <WapperContentOrder>
                  <span>Thuế</span>
                  <span style={{ fontWeight: 500 }}>0</span>
                </WapperContentOrder>
                <WapperContentOrder>
                  <span>Phí giao hàng</span>
                  <span style={{ fontWeight: 500 }}>0</span>
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
                    0
                  </span>
                </WapperContentOrder>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                type="primary"
                danger
                style={{
                  fontSize: "1.6rem",
                  padding: "25px 60px",
                }}
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

export default OrderPage;
