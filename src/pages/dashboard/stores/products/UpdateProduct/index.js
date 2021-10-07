import { DASHBOARD_PRODUCT_DETAILS } from '@/constants/routes';
import { updateProduct } from '@/firebase/products';
import useProduct from '@/hooks/useProduct';
import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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

export default function UpdateProduct() {
  const history = useHistory();
  const { store_id, product_id } = useParams();
  const { data, loading, exists } = useProduct(product_id);
  //const { refreshStores } = useDashboard();
  const submitRef = useRef(null);
  const inputsRef = useRef({});

  const onSubmit = (e) => {
    e.preventDefault();
    submitRef.current.disabled = true;

    const data = {};
    inputs.map((item) => {
      data[item.inputProps.name] =
        inputsRef.current[item.inputProps.name].value;
    });

    updateProduct(product_id, data)
      .then(async () => {
        //await refreshStores();
        history.push(
          DASHBOARD_PRODUCT_DETAILS.replace(':store_id', store_id).replace(
            ':product_id',
            product_id,
          ),
        );
      })
      .catch(() => {
        submitRef.current.disabled = false;
      });
  };

  return (
    <>
      <p>UpdateProduct</p>
      {loading ? (
        <div>cargando...</div>
      ) : !exists ? (
        <div>Producto no encontrada</div>
      ) : (
        <form onSubmit={onSubmit}>
          {inputs.map((item) => (
            <div key={item.inputProps.id}>
              <label htmlFor={item.inputProps.id}>{item.label}</label>
              <input
                ref={(el) => (inputsRef.current[item.inputProps.name] = el)}
                {...item.inputProps}
                defaultValue={data[item.inputProps.name]}
              />
            </div>
          ))}
          <button ref={submitRef} type="submit">
            Modificar
          </button>
        </form>
      )}
    </>
  );
}
