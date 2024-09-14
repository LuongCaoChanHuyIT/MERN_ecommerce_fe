import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { getAllProduct } from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useQueryHooks } from "../../hooks/useQueryHooks";

import TableProduct from "./TableProduct";
import Create from "./Create";
import Update from "./Update";
import Delete from "./Delete";

const AdminProductComponent = () => {
  const product = useSelector((state) => state.product);
  const [rowSelected, setRowSelected] = useState();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleDeleteProduct = () => {
    setIsOpenDelete(true);
  };
  const handleDetailProduct = () => {
    setIsOpenUpdate(true);
  };
  const handleCreateProduct = () => {
    setIsOpenCreate(true);
  };
  const getAllProducts = async () => {
    const res = await getAllProduct(product?.access_token);
    return res;
  };
  const queryProducts = useQueryHooks(getAllProducts, "product");
  const { data: dataProducts, isLoading: isLoadingProduct } = queryProducts;
  const dataProductRefetch = () => {
    queryProducts.refetch();
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <TableProduct
        handleDeleteProduct={handleDeleteProduct}
        handleDetailProduct={handleDetailProduct}
        handleCreateProduct={handleCreateProduct}
        dataProducts={dataProducts}
        setRowSelected={setRowSelected}
        isLoadingProduct={isLoadingProduct}
        dataProductRefetch={dataProductRefetch}
      />
      <Create
        isOpenCreate={isOpenCreate}
        setIsOpenCreate={setIsOpenCreate}
        dataProductRefetch={dataProductRefetch}
      />
      <Update
        isOpenUpdate={isOpenUpdate}
        setIsOpenUpdate={setIsOpenUpdate}
        rowSelected={rowSelected}
        dataProductRefetch={dataProductRefetch}
      />
      <Delete
        isOpenDelete={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
        rowSelected={rowSelected}
        dataProductRefetch={dataProductRefetch}
      />
    </div>
  );
};

export default AdminProductComponent;
