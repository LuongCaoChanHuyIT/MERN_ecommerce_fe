import styled from "styled-components";
import { Image, Col, InputNumber } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export const WrapperStyleImageSmall = styled(Image)`
  height: 100px;
  width: 100px;
`;
export const WrapperStyleColImage = styled(Col)`
  flex-basis: unset;
`;
export const WrapperStyleNameProduct = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 2.4rem;
  font-weight: 300;
  line-height: 32px;
  word-break: normal;
`;
export const WrapperStyleTextSell = styled.span`
  font-size: 1.5rem;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;
export const WrapperPriceProduct = styled.div`
  background-color: rgb(250, 250, 250);
  border-radius: 4px;
`;
export const WrapperPriceTextProduct = styled.span`
  font-size: 3.2rem;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 300;
  padding: 10px;
  margin-top: 10px;
`;
export const WrapperAddressPriceProduct = styled.div`
  span.address {
    text-decoration: underline;
    font-size: 1.5rem;
    line-height: 2.4rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span.change-address {
    color: rgb(11, 116, 229);
    font-size: 1.6rem;
    line-height: 24px;
    font-weight: 500;
    flex-shrink: 0;
  }
`;
export const WrapperQualityProduct = styled.h2``;
export const WrapperNumberQuantity = styled(InputNumber)`
  border-radius: 0;
  display: flex;
  width: 3rem;
  height: 2.4rem;
  border: none;
  background-color: #ccc;
  align-items: center;
`;
export const WrapperButtonChoose = styled(ButtonComponent)`
  background-color: rgb(255, 57, 69) !important;
  font-size: 2rem;
  font-weight: 300;
  width: fit-content;
  height: fit-content;
  padding: 10px 30px;
  margin-top: 30px;
  border-radius: 5px !important;
`;
export const WrapperButtonCard = styled(ButtonComponent)`
  background-color: rgb(26, 148, 255) !important;
  font-size: 2rem;
  font-weight: 300;
  width: fit-content;
  height: fit-content;
  padding: 10px 30px;
  margin-top: 30px;
  margin-left: 10px;
  border-radius: 5px !important;
`;
