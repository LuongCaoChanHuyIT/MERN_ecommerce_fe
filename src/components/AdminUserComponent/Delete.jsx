import { message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { deleteUser } from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
const Delete = ({
  isOpenDelete,
  setIsOpenDelete,
  rowSelected,
  dataUserRefetch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onCancel = () => {
    setIsOpenDelete(false);
  };
  const mutation = useMutationHooks((id) => {
    return deleteUser(rowSelected);
  });
  const { data } = mutation;
  const onOk = () => {
    mutation.mutate(rowSelected);
    setIsLoading(true);
  };
  useEffect(() => {
    if (data?.status === "OK") {
      dataUserRefetch();
      setIsOpenDelete(false);
      message.success("Xóa người dùng thành công!");
      setIsLoading(false);
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
      <Spin spinning={isLoading}>
        <span>Bạn có muốn xóa người dùng ?</span>{" "}
      </Spin>
    </Modal>
  );
};

export default Delete;
