import { addProduct } from '@/redux/slices/cart';
import { useDispatch, useSelector } from 'react-redux';

export default function useProductCart(id) {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const checkExists = () => {
    const exists = products.find((i) => i.product_id === id);
    return !!exists;
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

  return {
    exists: checkExists(),
    add: addHandler,
  };
}
