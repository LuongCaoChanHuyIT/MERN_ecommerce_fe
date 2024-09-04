import { message, Modal, Spin } from "antd";
import React, { useEffect } from "react";
import { deleteUser } from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
const Delete = ({
  isOpenDelete,
  setIsOpenDelete,
  rowSelected,
  dataUserRefetch,
}) => {
  const onCancel = () => {
    setIsOpenDelete(false);
  };
  const mutation = useMutationHooks((id) => {
    return deleteUser(rowSelected);
  });
  const { data, isPending } = mutation;
  const onOk = () => {
    mutation.mutate(rowSelected);
  };
  useEffect(() => {
    dataUserRefetch();
    setIsOpenDelete(false);
    if (data?.status === "OK") {
      message.success("Xóa người dùng thành công!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.status]);
  return (
    <Modal
      title="Xóa người dùng"
      open={isOpenDelete}
      onCancel={onCancel}
      onOk={onOk}
    >
      <span>Bạn có muốn xóa người dùng ?</span>
    </Modal>
  );
};

export default Delete;
