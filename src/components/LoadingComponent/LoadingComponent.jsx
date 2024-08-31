import { Spin } from "antd";
import React from "react";

const LoadingComponent = ({ children, isLoading, delay = 200 }) => {
  return (
    <div>
      <Spin spinning={isLoading} delay={500}>
        {children}
      </Spin>
    </div>
  );
};

export default LoadingComponent;
