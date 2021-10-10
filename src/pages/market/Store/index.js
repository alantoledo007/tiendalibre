import { PRODUCT } from '@/constants/routes';
import useProducts from '@/hooks/useProducts';
import useStore from '@/hooks/useStore';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function Store() {
  const { slug } = useParams();
  const { data, loading, exists } = useStore(slug, { slug: true });

  return (
    <div>
      <h1>Store</h1>
      {loading ? (
        <div>cargando...</div>
      ) : !exists ? (
        <div>La tienda no existe</div>
      ) : (
        <>
          <ul>
            <li>nombre: {data.name}</li>
          </ul>
          <ProductList store_id={data.id} store_slug={slug} />
        </>
      )}
    </div>
  );
}

const ProductList = ({ store_id, store_slug }) => {
  const { data, loading } = useProducts(store_id, { market: true });

  if (loading) {
    return <div>cargando productos...</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
          <div>${item.price} ARS</div>
          <div>
            <Link
              to={PRODUCT.replace(':slug', store_slug).replace(
                ':product_slug',
                `${item.title.replaceAll(' ', '-')}-${item.id}`,
              )}>
              Ver detalles
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
