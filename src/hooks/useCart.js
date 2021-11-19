import {
  addProduct,
  clearCart,
  removeProduct,
  updateQuantity,
} from '@/redux/slices/cart';
import { useDispatch, useSelector } from 'react-redux';

export default function useCart() {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeItem = (index) => {
    dispatch(removeProduct(index));
  };

  const handleUpdateQuantity = (index, request_quantity) => {
    let quantity = parseInt(request_quantity, 10);
    if (isNaN(quantity)) {
      quantity = 1;
    }
    dispatch(updateQuantity({ index, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const addHandler = (product, store) => {
    dispatch(
      addProduct({
        product_id: product.id,
        max_quantity: product.stock,
        title: product.title,
        price: product.price,
        quantity: 1,
        subtotal: product.price,
        ...store,
      }),
    );
  };

  const checkExists = (product_id) => {
    return products.some((i) => i.product_id === product_id);
  };

  return {
    items: products,
    total: products.reduce((total, item) => {
      return total + item.subtotal;
    }, 0),
    removeItem,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    checkExists,
    addToCart: addHandler,
  };
}
