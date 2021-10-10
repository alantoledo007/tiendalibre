import useCart from '@/hooks/useCart';

export default function Cart() {
  const { items, total, removeItem, updateQuantity } = useCart();
  return (
    <div>
      <div>Cart</div>
      <div>
        {items.map((item, index) => (
          <div key={item.product_id}>
            {item.title} ${item.price} | subtotal: ${item.subtotal} cantidad:{' '}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(index, e.target.value)}
              min={1}
              max={item.max_quantity}
            />{' '}
            stock: {item.max_quantity}
            <button onClick={() => removeItem(item.product_id)}>&times;</button>
          </div>
        ))}
        <h3>Total: ${total}</h3>
      </div>
    </div>
  );
}
