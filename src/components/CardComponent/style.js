import styled from "styled-components";

export const StyleNameProduct = styled.div`
  font-weight: 400;
  /* font-size: 1.2rem !important; */
  line-height: 1.6rem;
  color: rgb(56, 56, 61);
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
`;
export const WrapperReportText = styled.div`
  /* font-size: 1rem; */
  color: rgb(128, 128, 137);
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 6px 0 0;
`;
export const WrapperPriceText = styled.div`
  color: rgb(255, 66, 78);
  /* font-size: 1.6rem !important; */
  display: flex;
  gap: 10px;
  font-weight: 500;
  margin: 8px 0;
`;
export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  /* font-size: 1.2rem !important; */
  font-weight: 500;
`;
export const WrapperStyleTextSell = styled.span`
  /* font-size: 1.5rem !important; */
  line-height: 24px;
  color: rgb(120, 120, 120);
`;
