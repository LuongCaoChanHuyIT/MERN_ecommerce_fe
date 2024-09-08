import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: " ",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItem.product
      );
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.filter(
        (item) => item?.product !== idProduct
      );
      state.orderItems = itemOrder;
    },

    changeAmount: (state, action) => {
      const { value, id } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === id);
      itemOrder.amount = value;
      console.log(itemOrder);
    },
    changeCheck: (state, action) => {
      const { value, id } = action.payload;
      console.log(value, id);
      const itemOrder = state?.orderItems?.find((item) => item?.product === id);
      itemOrder.checked = value;
      console.log(itemOrder);
    },
  },
});

export const {
  addOrderProduct,
  removeOrderProduct,
  changeCheck,
  changeAmount,
} = orderSlide.actions;

export default orderSlide.reducer;
