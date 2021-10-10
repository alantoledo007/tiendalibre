import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cart';

const reducer = { cart };

const store = configureStore({
  reducer,
});

export default store;
