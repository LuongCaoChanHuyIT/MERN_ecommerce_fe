import { Col, Radio } from "antd";
import { styled } from "styled-components";
export const WapperContentOrder = styled.div`
  display: flex;
  font-size: 1.2rem;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
`;
export const WrapperMethod = styled.div`
  background-color: #fff;
  width: 100%;

  border-radius: 4px;
  border-bottom: 3px solid rgb(239, 239, 239);
`;
export const WrapperProductCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;
export const WrapperTitleCol = styled(Col)`
  background-color: #fff;
  width: 100%;
  padding: 10px 0;
  border-radius: 4px;
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
export const WrapperContent = styled.div`
  display: flex;
  gap: 20px;
`;
export const WrapperLabel = styled.label`
  color: #000;
  font-size: 1rem;
  text-align: left;
  width: 150px;
`;
export const WrapperIconCheckRadio = styled(Radio)`
  .ant-radio-inner,
  .ant-radio-inner:after {
    border-radius: 0 !important;
  }
  .ant-radio-inner:after {
    border: none !important;
  }
`;
