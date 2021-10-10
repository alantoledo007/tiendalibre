import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

/*
price
quantity
product_id
max_quantity
store_id
subtotal
*/

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products = [...state.products, action.payload];
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (item) => item.product_id !== action.payload,
      );
    },
    clearCart() {
      return initialState;
    },
    updateQuantity(state, action) {
      const { index, quantity } = action.payload;
      const item = state.products[index];

      let normalized_quantity = quantity;
      if (quantity > item.max_quantity) {
        normalized_quantity = item.max_quantity;
      } else if (quantity < 1) {
        normalized_quantity = 1;
      }
      state.products[index].quantity = normalized_quantity;
      state.products[index].subtotal = item.price * normalized_quantity;
    },
  },
});

export const { addProduct, removeProduct, clearCart, updateQuantity } =
  cart.actions;

export default cart.reducer;
