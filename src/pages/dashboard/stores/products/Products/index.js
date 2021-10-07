import { CREATE_PRODUCT, DASHBOARD_PRODUCT_DETAILS } from '@/constants/routes';
import useProducts from '@/hooks/useProducts';
import { Link, useParams } from 'react-router-dom';

export default function Products() {
  const { store_id } = useParams();
  const { data, loading } = useProducts(store_id);

  return (
    <>
      <div>Products</div>

      <nav>
        <ul>
          <li>
            <Link to={CREATE_PRODUCT.replace(':store_id', store_id)}>
              Nuevo producto
            </Link>
          </li>
        </ul>
      </nav>
      {loading ? (
        <div>cargando...</div>
      ) : (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <span>{item.title}</span> <span>${item.price}</span>{' '}
              <span>x{item.stock}</span>{' '}
              <Link
                to={DASHBOARD_PRODUCT_DETAILS.replace(
                  ':store_id',
                  store_id,
                ).replace(':product_id', item.id)}>
                ir
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
