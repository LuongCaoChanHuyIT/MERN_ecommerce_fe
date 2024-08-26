import style from "styled-components";
import { Row } from "antd";
export const WrapperHeader = style(Row)`
  padding: 10px 120px;
  background-color: rgb(26, 148, 255);
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;
export const WrapperTextHeader = style.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: flex;
`;
export const WrapperHeaderAccount = style.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  
`;
export const WrapperTextHeaderSmall = style.span`
    
   color: #fff;
   white-space: nowrap;
`;
