import React, { useState } from "react";
import { Button, Checkbox, Col, Image, InputNumber, message, Row } from "antd";
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
  changeCheckAll,
  deleteProductChecked,
  provisonalOrder,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import UpdateInfoUser from "./UpdateInfoUser";
import { useNavigate } from "react-router-dom";
const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const handlePay = () => {
    if (order?.orderItemSelected.length > 0) {
      if (!user?.name || !user?.phone || !user?.address) {
        setIsOpenCreate(true);
      } else {
        navigate("/payment");
      }
    } else {
      message.error("Bạn chưa chọn sản phẩm nào");
    }
  };
  const onChange = (value, id) => {
    dispatch(changeAmount({ value, id }));
    dispatch(provisonalOrder());
  };
  const handleDeleteOrder = (id) => {
    dispatch(removeOrderProduct({ idProduct: id }));
    dispatch(provisonalOrder());
  };
  const onChangeCheck = (e, id) => {
    let check = e.target.checked;
    dispatch(changeCheck({ value: check, id }));
    dispatch(provisonalOrder());
  };
  const onChangeCheckAll = (e) => {
    dispatch(changeCheckAll({ value: e.target.checked }));
    dispatch(provisonalOrder());
  };
  const handleDeleteProductChecked = () => {
    dispatch(deleteProductChecked());
    dispatch(provisonalOrder());
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
                  <Checkbox
                    onChange={onChangeCheckAll}
                    style={{ marginRight: "10px" }}
                  ></Checkbox>
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
                  <DeleteOutlined onClick={handleDeleteProductChecked} />
                </WrapperProductCol>
              </Row>
            </WrapperTitleCol>
            <WrapperProduct>
              {order?.orderItems?.map((order) => (
                <Row key={order?.product}>
                  <WrapperProductCol
                    span={8}
                    style={{ justifyContent: "start", paddingLeft: "10px" }}
                  >
                    <Checkbox
                      checked={order?.checked}
                      onChange={(e) => onChangeCheck(e, order?.product)}
                      style={{ marginRight: "10px" }}
                    ></Checkbox>
                    <Image src={order?.image} style={{ width: "100px" }} />
                    <span style={{ width: "100%", marginLeft: "20px" }}>
                      {order?.name}
                    </span>
                  </WrapperProductCol>
                  <WrapperProductCol span={4}>
                    <span>{convertPrice(order?.price)}VNĐ</span>
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
                      {convertPrice(order?.price * order?.amount)}VNĐ
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
          <Col span={6}>
            <div
              style={{
                backgroundColor: "#fff",
                width: "100%",
                borderRadius: "4px",
              }}
            >
              <div>
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
      <UpdateInfoUser
        isOpenCreate={isOpenCreate}
        setIsOpenCreate={setIsOpenCreate}
      />
    </div>
  );
};

export default OrderPage;
