import {
  DASHBOARD_ORDERS,
  DELETE_STORE,
  UPDATE_STORE,
} from '@/constants/routes';
import useDashboardStore from '@/hooks/useDashboardStore';
import useDashboardStoreUnmount from '@/hooks/useDashboardStoreUnmount';
import { Link, useParams } from 'react-router-dom';
import { DASHBOARD_PRODUCTS } from '@/constants/routes';

export default function StoreDetails() {
  const { id } = useParams();
  const { data, loading, exists } = useDashboardStore(id);
  useDashboardStoreUnmount();

  return (
    <>
      <p>StoreDetails</p>
      {loading ? (
        <div>cargando...</div>
      ) : !exists ? (
        <div>Tienda no encontrada</div>
      ) : (
        <div>
          <ul>
            <li>Nombre: {data.name}</li>
            <li>Slug: {data.slug}</li>
            <li>
              <Link to={UPDATE_STORE.replace(':id', id)}>Modificar</Link>
            </li>
            <li>
              <Link to={DELETE_STORE.replace(':id', id)}>Borrar</Link>
            </li>
            <li>
              <Link to={DASHBOARD_ORDERS.replace(':store_id', id)}>
                Pedidos
              </Link>
            </li>
            <li>
              <Link to={DASHBOARD_PRODUCTS.replace(':store_id', id)}>
                Productos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
