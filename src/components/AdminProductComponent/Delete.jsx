import React, { useEffect, useState } from "react";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { deleteProduct } from "../../services/ProductService";
import { message, Modal, Spin } from "antd";
const Delete = ({
  isOpenDelete,
  setIsOpenDelete,
  rowSelected,
  dataProductRefetch,
}) => {
  const mutation = useMutationHooks((data) => {
    return deleteProduct(data);
  });
  const { data } = mutation;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (data?.status === "SUCCESS") {
      dataProductRefetch();
      setIsOpenDelete(false);
      message.success("Xóa người dùng thành công!");
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);
  const onCancel = () => {
    setIsOpenDelete(false);
  };
  const onOk = () => {
    mutation.mutate(rowSelected);
    setIsLoading(true);
  };
  return (
    <Modal
      title="Xóa sản phẩm"
      open={isOpenDelete}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Spin spinning={isLoading}>
        <span>Bạn có muốn xóa sản phẩm ?</span>
      </Spin>
    </Modal>
  );
};

export default Delete;
