import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    quantity: 0,
    product: [],
  },
  reducers: {
    addProductInCart: (state, { payload }) => {
      console.log(payload, "dddd");
      let isProductAlreadyAdded = false;
      const foundProduct = state.product.find((data) => {
        return data.id === payload.productId;
      });
      // console.log(foundProduct);
      if (foundProduct) {
        // true case here

      } else {
        state.product.push({
          id: payload.productId,
          quantity: payload.quantity,
        });
        state.quantity = state.quantity + 1;
      }
    },
    removeProductFromCart: (state, { payload }) => {
      state.product = state.product.filter((product) => {
        if (product.id === payload) {
          state.quantity = state.quantity - 1;
          return false;
        } else {
          return true;
        }
      });
    },
    increaseCartQuantity: (state, { payload }) => {},
  },
});

export const { addProductInCart, removeProductFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
