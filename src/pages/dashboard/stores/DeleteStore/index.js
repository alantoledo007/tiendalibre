import { MY_STORES, STORE_DETAILS } from '@/constants/routes';
import { deleteStore } from '@/firebase/stores';
import useDashboard from '@/hooks/useDashboard';
import useDashboardStore from '@/hooks/useDashboardStore';
import useDashboardStoreUnmount from '@/hooks/useDashboardStoreUnmount';
import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export default function DeleteStore() {
  const history = useHistory();
  const { id } = useParams();
  const { data, loading, exists } = useDashboardStore(id);
  const { refreshStores } = useDashboard();
  const buttonsRef = useRef({});
  useDashboardStoreUnmount();

  const onConfirm = () => {
    buttonsRef.current.delete.disabled = true;
    buttonsRef.current.cancel.disabled = true;

    deleteStore(id)
      .then(async () => {
        await refreshStores();
        history.replace(MY_STORES);
      })
      .catch(() => {
        buttonsRef.current.delete.disabled = false;
        buttonsRef.current.cancel.disabled = false;
      });
  };

  const onCancel = () => {
    history.replace(STORE_DETAILS.replace(':id', id));
  };

  return (
    <>
      <p>DeleteStore</p>
      {loading ? (
        <div>cargando...</div>
      ) : !exists ? (
        <div>Tienda no encontrada</div>
      ) : (
        <div>
          <p>
            Seguro que desear borrar definitivamente la tienda{' '}
            <strong>{data.name}</strong>?
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
