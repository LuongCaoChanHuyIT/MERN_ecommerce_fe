import React, { useState } from "react";
import { WrapperHeader } from "./style";
import { useQueryHooks } from "../../hooks/useQueryHooks";
import { getAllOrder } from "../../services/OrderService.js";
import { useSelector } from "react-redux";
import TableOrder from "./TableOrder.jsx";
import Create from "./Create.jsx";
import Update from "./Update.jsx";
import Delete from "./Delete.jsx";

const AdminOrderComponent = () => {
  const user = useSelector((state) => state.user);
  const [rowSelected, setRowSelected] = useState();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleDeleteOrder = () => {
    setIsOpenDelete(true);
  };
  const handleDetailOrder = () => {
    setIsOpenUpdate(true);
  };
  const handleCreateOrder = () => {
    setIsOpenCreate(true);
  };
  const getAllOrders = async () => {
    const res = await getAllOrder(user?.access_token);
    return res;
  };
  const queryOrders = useQueryHooks(getAllOrders, "order");
  const { data: dataOrders, isLoading: isLoadingOrder } = queryOrders;
  const dataOrderRefetch = () => {
    queryOrders.refetch();
  };

  return (
    <div>
      <WrapperHeader>Quản lý hóa đơn</WrapperHeader>
      <TableOrder
        handleDeleteOrder={handleDeleteOrder}
        handleDetailOrder={handleDetailOrder}
        handleCreateOrder={handleCreateOrder}
        dataOrders={dataOrders}
        setRowSelected={setRowSelected}
        isLoadingOrder={isLoadingOrder}
        dataOrderRefetch={dataOrderRefetch}
      />
      {/* <Create
        isOpenCreate={isOpenCreate}
        setIsOpenCreate={setIsOpenCreate}
        dataOrderRefetch={dataOrderRefetch}
      />
      <Update
        isOpenUpdate={isOpenUpdate}
        setIsOpenUpdate={setIsOpenUpdate}
        rowSelected={rowSelected}
        dataOrderRefetch={dataOrderRefetch}
      />
      <Delete
        isOpenDelete={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
        rowSelected={rowSelected}
        dataOrderRefetch={dataOrderRefetch}
      /> */}
    </div>
  );
};

export default AdminOrderComponent;
