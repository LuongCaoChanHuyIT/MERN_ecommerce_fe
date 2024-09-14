import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 1.8rem;
  margin: 4px 0;
`;
export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: auto;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
`;
export const WrapperLabel = styled.label`
  color: #000;
  font-size: 1.2rem;
  /* line-height: 16px; */
  width: 50px;
  text-align: left;
`;
export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  gap: 20px;
`;
export const WrapperUploadFile = styled(Upload)`
  .ant-upload-list-item-container {
    display: none !important;
  }
`;
