import ORDER_STATES from '@/constants/order_states';
import useOrder from '@/hooks/useOrder';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { order_id } = useParams();
  const { data, loading, exists, updateStatus } = useOrder(order_id);
  const buttonsRef = useRef({});

  if (loading) {
    return <div>cargando...</div>;
  }

  if (!exists) {
    return <div>Orden no encontrada.</div>;
  }

  return (
    <div>
      <div>OrderDetails</div>
      <h4>Cliente</h4>
      <ul>
        <li>Nombre: {data.client.name}</li>
        <li>Apellido: {data.client.surname}</li>
        <li>DNI: {data.client.document_number}</li>
        <li>E-Mail: {data.client.email}</li>
        <li>Teléfono: {data.client.phone}</li>
      </ul>
      <h4>Productos</h4>
      <ul>
        {data.items.map((item) => (
          <li key={item.id}>
            {item.title} x{item.quantity} ${item.price} / subtotal: $
            {item.subtotal}
          </li>
        ))}
      </ul>
      <h4>Total: ${data.total}</h4>
      <div>Creada en: {Date(data.created_at.seconds)}</div>
      <div>Estado: {data.status}</div>
      <div>
        Última actualizacion:{' '}
        {data.updated_at ? Date(data.updated_at.seconds) : '-'}
      </div>

      {data.status === ORDER_STATES.PENDING ||
      data.status === ORDER_STATES.CONFIRMED ? (
        <>
          <h4>Actualizar estado del pedido</h4>
        </>
      ) : null}
      {data.status === ORDER_STATES.PENDING && (
        <div>
          <button
            onClick={() => updateStatus(buttonsRef, ORDER_STATES.CONFIRMED)}
            ref={(el) => (buttonsRef.current.confirm = el)}>
            Confirmar
          </button>
          <button
            onClick={() => updateStatus(buttonsRef, ORDER_STATES.REJECTED)}
            ref={(el) => (buttonsRef.current.reject = el)}>
            Rechazar
          </button>
        </div>
      )}

      {data.status === ORDER_STATES.CONFIRMED && (
        <div>
          <button
            onClick={() => updateStatus(buttonsRef, ORDER_STATES.COMPLETED)}
            ref={(el) => (buttonsRef.current.complete = el)}>
            Completar
          </button>
          <button
            onClick={() => updateStatus(buttonsRef, ORDER_STATES.CANCELLED)}
            ref={(el) => (buttonsRef.current.cancel = el)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
