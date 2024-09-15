import React from "react";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import { getOrderDetails } from "../../services/OrderService";
import { useSelector } from "react-redux";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const fetchMyOrder = async () => {
    const res = await getOrderDetails(user?.access_token, user?.id);
    return res.data;
  };
  const query = useQueryHooks(fetchMyOrder, "product", { enabled: user.id });
  const { data } = query;
  console.log(data);
  return <div>MyOrderPage</div>;
};

export default MyOrderPage;
