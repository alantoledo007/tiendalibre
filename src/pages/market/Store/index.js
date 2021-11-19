import { CART, PRODUCT, STORE } from '@/constants/routes';
import useProducts from '@/hooks/useProducts';
import useStore from '@/hooks/useStore';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import LinkCustom from '@/components/shared/LinkCustom';
import useCart from '@/hooks/useCart';
import Button from '@/components/shared/Button';

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
          <Header slug={slug} />
          <ul>
            <li>nombre: {data.name}</li>
          </ul>
          <ProductList store={data} />
        </>
      )}
    </div>
  );
}

const Header = ({ slug }) => {
  return (
    <nav>
      <ul>
        <NavLink to={STORE.replace(':slug', slug)}>Productos</NavLink>
      </ul>
    </nav>
  );
};

const ProductList = ({ store }) => {
  const { id: store_id, slug: store_slug, name: store_name } = store;
  const { data, loading } = useProducts(store_id, { market: true });
  const { checkExists: checkInCart, addToCart } = useCart();

  if (loading) {
    return <div>cargando productos...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.map((item) => (
        <div key={item.id} className="p-5 shadow-lg rounded">
          <div>
            <h3 className="text-lg">{item.title}</h3>
          </div>
          <div>
            <span className="font-thin text-xl">${item.price}</span>
          </div>
          <div className="mt-5 ">
            <LinkCustom
              to={PRODUCT.replace(':slug', store_slug).replace(
                ':product_slug',
                `${item.title.replaceAll(' ', '-')}-${item.id}`,
              )}>
              Ver detalles
            </LinkCustom>
          </div>
          <div className="mt-5">
            {checkInCart(item.id) ? (
              <LinkCustom variant="secondary" to={CART}>
                Ver carrito
              </LinkCustom>
            ) : (
              <Button
                variant="secondary"
                onClick={() => addToCart(item, { store_id, store_name })}>
                Añadir al carrito
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
