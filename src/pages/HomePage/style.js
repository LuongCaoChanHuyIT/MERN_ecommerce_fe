import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  border-bottom: 1px solid red;
  height: 44px;
`;
export const WrapperButtonMore = styled(ButtonComponent)`
  width: fit-content !important;
  &:hover {
    color: "#fff";
    background-color: rgba(13, 92, 182, 0.8) !important;

    span {
      color: "#fff";
    }
  }
`;
export const WrapperProducts = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
`;
