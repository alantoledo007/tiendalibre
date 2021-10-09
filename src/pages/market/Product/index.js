import { PRODUCT } from '@/constants/routes';
import useProduct from '@/hooks/useProduct';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

export default function Product() {
  const { product_slug, slug: store_slug } = useParams();
  const { id, slug } = useSlugResolver(product_slug);
  const { data, loading, exists } = useProduct(id, { store: true });
  const history = useHistory();

  useEffect(() => {
    if (loading === false && exists) {
      const correct_slug = data.title.replaceAll(' ', '-');
      if (correct_slug !== slug || store_slug !== data.store.slug) {
        history.replace(
          PRODUCT.replace(':slug', data.store.slug).replace(
            ':product_slug',
            `${correct_slug}-${data.id}`,
          ),
        );
      }
    }
  }, [data, loading, slug, exists, store_slug]);

  if (loading === true) {
    return <div>cargando...</div>;
  }

  if (exists === false) {
    return <div>El producto no existe.</div>;
  }

  return (
    <div>
      <div>{data.title}</div>
      <div>${data.price}</div>
      <div>{data.description}</div>
    </div>
  );
}

const useSlugResolver = (product_slug) => {
  if (!product_slug) return {};
  const id = product_slug.split('-').at(-1);
  const slug = product_slug.replace(`-${id}`, '');

  return { id, slug };
};
