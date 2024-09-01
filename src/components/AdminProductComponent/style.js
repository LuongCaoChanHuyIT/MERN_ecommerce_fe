import { Image, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 1.4rem;
`;

export const WrapperButtonTable = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
`;

export const WrapperForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
`;
export const WrapperLableInput = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
export const WrapperLabel = styled.label`
  color: #000;
  font-size: 1rem;
  text-align: left;
  width: 150px;
`;
export const WrapperUploadFile = styled(Upload)`
  .ant-upload-list-item-container {
    display: none !important;
  }
  position: absolute;
  top: calc(100% - 32px);
  bottom: auto;

  right: auto;
`;

export const WrapperFileImage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
`;
export const WrapperContent = styled.div`
  display: flex;
  gap: 20px;
`;
export const WrapperLableImage = styled.div`
  color: #000;
  font-size: 1rem;
  text-align: left;
  width: 150px;
  margin-right: auto;
`;
