import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/getAll`
  );
  return res.data;
};
export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};
export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get/${id}`
  );
  return res.data;
};
export const updateProduct = async (id, access_token, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
      headers: {
        token:`Bearer ${access_token}`
      }
    }
  );
  return res.data;
};