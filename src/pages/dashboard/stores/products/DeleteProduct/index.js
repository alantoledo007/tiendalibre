import {
  DASHBOARD_PRODUCTS,
  DASHBOARD_PRODUCT_DETAILS,
} from '@/constants/routes';
import { deleteProduct } from '@/firebase/products';
import useDashboardStoreUnmount from '@/hooks/useDashboardStoreUnmount';
import useProduct from '@/hooks/useProduct';
import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export default function DeleteStore() {
  const history = useHistory();
  const { store_id, product_id } = useParams();
  const { data, loading, exists } = useProduct(product_id);
  //const { refreshStores } = useDashboard();
  const buttonsRef = useRef({});
  useDashboardStoreUnmount();

  const onConfirm = () => {
    buttonsRef.current.delete.disabled = true;
    buttonsRef.current.cancel.disabled = true;

    deleteProduct(product_id)
      .then(async () => {
        //await refreshStores();
        history.replace(DASHBOARD_PRODUCTS.replace(':store_id', store_id));
      })
      .catch(() => {
        buttonsRef.current.delete.disabled = false;
        buttonsRef.current.cancel.disabled = false;
      });
  };

  const onCancel = () => {
    history.replace(
      DASHBOARD_PRODUCT_DETAILS.replace(':store_id', store_id).replace(
        ':product_id',
        product_id,
      ),
    );
  };

  return (
    <>
      <p>DeleteStore</p>
      {loading ? (
        <div>cargando...</div>
      ) : !exists ? (
        <div>Producto no encontrado</div>
      ) : (
        <div>
          <p>
            Seguro que desear borrar definitivamente el producto{' '}
            <strong>{data.title}</strong>?
          </p>
          <button
            ref={(el) => (buttonsRef.current['delete'] = el)}
            onClick={onConfirm}>
            Confirmar
          </button>
          <button
            ref={(el) => (buttonsRef.current['cancel'] = el)}
            onClick={onCancel}>
            Cancelar
          </button>
        </div>
      )}
    </>
  );
}
