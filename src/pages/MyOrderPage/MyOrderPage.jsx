import React from "react";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import { getOrderDetails } from "../../services/OrderService";
import { useSelector } from "react-redux";
import { WrapperOrderCard, WrapperCardProduct } from "./style";
import { Button, Image } from "antd";

import { convertPrice } from "../../utils";
const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const fetchMyOrder = async () => {
    const res = await getOrderDetails(user?.access_token, user?.id);
    return res.data;
  };
  const query = useQueryHooks(fetchMyOrder, "my-order");
  const { data } = query;

  return (
    <div style={{ padding: "10px 120px" }}>
      <span style={{ fontSize: "1.6rem", fontWeight: 500 }}>
        Danh sách hóa đơn
      </span>
      {data?.map((item, i) => (
        <WrapperOrderCard key={i}>
          <div>
            <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
              Trạng thái
            </span>
            <div>
              <span style={{ color: "red" }}>Giao hàng:</span>
              <span>Chưa giao hàng</span>
            </div>
            <div>
              <span style={{ color: "red" }}>Thanh toán:</span>
              {item.isPaid ? (
                <span>Đã thanh toán</span>
              ) : (
                <span>Chưa thanh toán</span>
              )}
            </div>
          </div>
          <div style={{ margin: "10px 0" }}>
            {item.orderItems.map((item) => (
              <WrapperCardProduct key={item._id}>
                <Image src={item.image} width={60} height={60}></Image>
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    paddingLeft: "15px",
                    width: "500px",
                  }}
                >
                  {item.name}
                </span>
                <span style={{ position: "absolute", top: "5px", right: "0" }}>
                  {convertPrice(item.price)}vnd
                </span>
              </WrapperCardProduct>
            ))}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <div>
              Tổng tiền:
              <span style={{ color: "red" }}>
                {convertPrice(item.totalPrice)}vnd
              </span>
            </div>
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <Button>Hủy hóa đơn</Button>
              <Button>Chi tiết hóa đơn</Button>
            </div>
          </div>
        </WrapperOrderCard>
      ))}
    </div>
  );
};

export default MyOrderPage;
