import axios from "axios";
export const axiosJWT = axios.create();
export const createOrder = async (access_token, data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getOrderDetails = async (access_token, id) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/order/get-order-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/order/get-all-order`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const deleteOrderMany = async (access_token, ids) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/delete-many-order`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
