import { DASHBOARD_PRODUCTS } from '@/constants/routes';
import { createProduct } from '@/firebase/products';
import { storeRef } from '@/firebase/stores';
import { useRef } from 'react';
import { useParams } from 'react-router';

const inputs = [
  {
    label: 'Titulo',
    inputProps: { type: 'text', name: 'title', id: 'title' },
  },
  {
    label: 'Precio',
    inputProps: { type: 'number', name: 'price', id: 'price', step: 'any' },
  },
  {
    label: 'Stock',
    inputProps: { type: 'text', name: 'stock', id: 'stock' },
  },
  {
    label: 'Descripción (opcional)',
    inputProps: { type: 'text', name: 'description', id: 'description' },
  },
];

export default function CreateProduct() {
  const inputsRef = useRef({});
  const submitRef = useRef(null);
  const formRef = useRef(null);
  const { store_id } = useParams();

  const onSubmit = (e) => {
    e.preventDefault();
    submitRef.current.disabled = true;

    const data = {};
    data.store_ref = storeRef(store_id);
    inputs.map((item) => {
      data[item.inputProps.name] =
        inputsRef.current[item.inputProps.name].value;
    });

    createProduct(data)
      .then(async () => {
        //await refreshStores();
        formRef.current.reset();
        history.push(DASHBOARD_PRODUCTS);
      })
      .catch(() => {
        submitRef.current.disabled = false;
      });
  };

  return (
    <>
      <h1>CreateProduct</h1>

      <form ref={formRef} onSubmit={onSubmit}>
        {inputs.map((item) => (
          <div key={item.inputProps.id}>
            <label htmlFor={item.inputProps.id}>{item.label}</label>
            <input
              ref={(el) => (inputsRef.current[item.inputProps.name] = el)}
              {...item.inputProps}
            />
          </div>
        ))}
        <button ref={submitRef} type="submit">
          Enviar
        </button>
      </form>
    </>
  );
}
