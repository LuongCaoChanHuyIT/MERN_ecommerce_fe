import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  provisionalPrice: 0,
  discountPrice: 0,
  taxPrice: 0,
  shippingPrice: 15000,
  totalPrice: 0,
  // itemsPrice: 0,
  // shippingPrice: 0,
  // taxPrice: 0,
  // totalPrice: 0,
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
    changeCheckAll: (state, action) => {
      const { value } = action.payload;
      state?.orderItems?.map((item) => {
        item.checked = value;
        return item;
      });
    },
    deleteProductChecked: (state, action) => {
      const valuesToRemove = [true];
      const filteredItems = state?.orderItems?.filter(
        (item) => !valuesToRemove.includes(item?.checked)
      );
      state.orderItems = filteredItems;
      console.log(filteredItems);
    },
    provisonalOrder: (state) => {
      let total = 0;
      let discount = 0;
      let tax = 0;
      const valuesToRemove = [true];
      let filteredItems = state?.orderItems?.filter((item) =>
        valuesToRemove.includes(item?.checked)
      );
      filteredItems.forEach((item) => {
        total += item.amount * item.price;
        discount += (item.amount * item.price * item.discount) / 100;
      });
      tax = total * 0.1;
      state.provisionalPrice = total;
      state.discountPrice = discount;
      state.taxPrice = tax;
      state.totalPrice = total - discount + tax + state.shippingPrice;
    },
  },
});

export const {
  addOrderProduct,
  removeOrderProduct,
  changeCheck,
  changeAmount,
  changeCheckAll,
  deleteProductChecked,
  provisonalOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
