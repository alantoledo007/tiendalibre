import { createOrders } from '@/firebase/orders';
import { productRef } from '@/firebase/products';
import { storeRef } from '@/firebase/stores';
import useCart from '@/hooks/useCart';
import useCheckout from '@/hooks/useCheckout';
import { useRef, useState } from 'react';

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const [checkout, setCheckout] = useState(false);

  if (checkout && items.length > 0) {
    return (
      <Checkout
        items={items}
        total={total}
        setCheckout={setCheckout}
        clearCart={clearCart}
      />
    );
  }

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
        {items.length > 0 && (
          <div>
            <p>Total: ${total}</p>
            <button onClick={() => setCheckout(true)}>Finalizar compra</button>
            <button onClick={clearCart}>Vaciar carrito</button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputs = [
  {
    label: 'Nombre',
    inputProps: { type: 'text', name: 'name', id: 'name' },
  },
  {
    label: 'Apellido',
    inputProps: { type: 'text', name: 'surname', id: 'surname' },
  },
  {
    label: 'DNI',
    inputProps: {
      type: 'number',
      name: 'document_number',
      id: 'document_number',
    },
  },
  {
    label: 'E-Mail',
    inputProps: { type: 'text', name: 'email', id: 'email' },
  },
];

const Checkout = ({ items, total, setCheckout, clearCart }) => {
  const { items_by_store, stores_length } = useCheckout(items);

  const inputsRef = useRef({});
  const buttonsRef = useRef({});

  const onSubmit = (e) => {
    e.preventDefault();
    buttonsRef.current.submit.disabled = true;
    buttonsRef.current.cancel.disabled = true;

    const data = {};
    inputs.map((item) => {
      data[item.inputProps.name] =
        inputsRef.current[item.inputProps.name].value;
    });

    const orders = Object.values(items_by_store).map((items) => {
      return {
        client: data,
        store: {
          id: items[0].store_id,
          ref: storeRef(items[0].store_id),
          name: items[0].store_name,
        },
        items: items.map((item) => ({
          id: item.product_id,
          ref: productRef(item.product_id),
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })),
        total: items.reduce((acc, item) => {
          return acc + item.subtotal;
        }, 0),
      };
    });

    createOrders(orders)
      .then(async () => {
        clearCart();
      })
      .catch(() => {
        buttonsRef.current.submit.disabled = false;
        buttonsRef.current.cancel.disabled = false;
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {inputs.map((item) => (
            <div key={item.inputProps.id}>
              <label htmlFor={item.inputProps.id}>{item.label}</label>
              <input
                ref={(el) => (inputsRef.current[item.inputProps.name] = el)}
                {...item.inputProps}
              />
            </div>
          ))}
        </div>

        <div>
          {Object.values(items_by_store).map((products) => (
            <div key={products[0].store_id}>
              <h4>{products[0].store_name}</h4>
              {products.map((item) => (
                <div key={item.product_id}>
                  {item.title} x{item.quantity} = ${item.subtotal}
                </div>
              ))}
            </div>
          ))}
          <div>total: ${total}</div>
        </div>
        {stores_length > 1 && (
          <div>
            <h4>Atención</h4>
            <p>
              Tu pedido contiene productos de tiendas diferentes, esto no es un
              problema, solo te avisamos que en lugar de una, serán{' '}
              {stores_length} tiendas con las que deberás contactarte.
            </p>
          </div>
        )}
        <button ref={(el) => (buttonsRef.current.submit = el)} type="submit">
          Enviar pedido
        </button>
        <button
          ref={(el) => (buttonsRef.current.cancel = el)}
          onClick={() => setCheckout(false)}
          type="button">
          Cancelar
        </button>
      </form>
    </div>
  );
};
