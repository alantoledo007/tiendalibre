import { DASHBOARD_ORDER_DETAILS } from '@/constants/routes';
import useOrders from '@/hooks/useOrders';
import { Link, useParams } from 'react-router-dom';

export default function Orders() {
  const { store_id } = useParams();
  const { data, loading } = useOrders(store_id);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>Orders</div>
      {data.map((item) => (
        <div key={item.id}>
          <div>
            {item.client.name} {item.client.surname}
          </div>
          <div>${item.total}</div>
          <div>Estado: {item.status}</div>
          <div>
            <Link
              to={DASHBOARD_ORDER_DETAILS.replace(
                ':store_id',
                store_id,
              ).replace(':order_id', item.id)}>
              ir
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
