import { DELETE_STORE, UPDATE_STORE } from '@/constants/routes';
import useStore from '@/hooks/useStore';
import { Link, useParams } from 'react-router-dom';

export default function StoreDetails() {
  const { id } = useParams();
  const { data, loading, exists } = useStore(id);
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
          </ul>
        </div>
      )}
    </>
  );
}
