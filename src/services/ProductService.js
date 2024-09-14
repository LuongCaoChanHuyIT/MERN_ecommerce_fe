import axios from "axios";
export const axiosJWT = axios.create();
export const getAllProduct = async (search, limit) => {
  let res = {};
  if (!search) {
    res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/product/getAll?limit=${limit}`
    );
  } else if (limit) {
    res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/product/getAll?filter=name&filter=${search}&limit=${limit}`
    );
  }
  return res.data;
};
export const getProductOption = async (type, option, page, limit) => {
  let res = {};
  // console.log(option);
  if (type) {
    res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/product/get-product-option?filter=type&filter=${type}&page=${page}&limit=${limit}&rankValue=${option}`
    );
    return res.data;
  }
  return res;
};
export const getProductType = async (type, page, limit) => {
  if (type) {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/product/getAll?filter=type&filter=${type}&page=${page}&limit=${limit}`
    );
    return res.data;
  }
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
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const deleteProduct = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`
  );
  return res.data;
};
export const getAllTypeProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`
  );
  return res.data;
};
export const deleteProductMany = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/delete-many`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
