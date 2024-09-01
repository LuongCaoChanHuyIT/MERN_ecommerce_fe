import { Table } from "antd";
import React from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data = [],
    isLoading = false,
    columns = [],
  } = props;

  return (
    <div>
      <LoadingComponent isLoading={isLoading}>
        <Table
          rowSelection={{
            type: selectionType,
          }}
          columns={columns}
          dataSource={data}
          {...props}
        />
      </LoadingComponent>
    </div>
  );
};

export default TableComponent;
