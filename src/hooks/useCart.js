import { removeProduct, updateQuantity } from '@/redux/slices/cart';
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

  return {
    items: products,
    total: products.reduce((total, item) => {
      return total + item.subtotal;
    }, 0),
    removeItem,
    updateQuantity: handleUpdateQuantity,
  };
}
