import { DELETE_PRODUCT, UPDATE_PRODUCT } from '@/constants/routes';
import useDashboardStoreUnmount from '@/hooks/useDashboardStoreUnmount';
import useProduct from '@/hooks/useProduct';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { store_id, product_id } = useParams();
  const { data, loading, exists } = useProduct(product_id);
  useDashboardStoreUnmount();

  return (
    <>
      <p>ProductDetails</p>
      {loading ? (
        <div>cargando...</div>
      ) : !exists ? (
        <div>Producto no encontrada</div>
      ) : (
        <div>
          <ul>
            <li>Titlo: {data.title}</li>
            <li>Stock: {data.stock}</li>
            <li>Precio: {data.price}</li>
            <li>Descripción: {data.description}</li>
            <li>
              Última actualización:{' '}
              {data.updated_at ? Date(data.updated_at.seconds) : '-'}
            </li>
            <li>Publicado en: {Date(data.created_at.seconds)}</li>
            <li>
              <Link
                to={UPDATE_PRODUCT.replace(':store_id', store_id).replace(
                  ':product_id',
                  product_id,
                )}>
                Modificar
              </Link>
            </li>
            <li>
              <Link
                to={DELETE_PRODUCT.replace(':store_id', store_id).replace(
                  ':product_id',
                  product_id,
                )}>
                Borrar
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
