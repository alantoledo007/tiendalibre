import { getProducts } from '@/firebase/products';
import { useEffect, useState } from 'react';

export default function useProducts(store_id) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (data !== undefined) return;
    let isMounted = true;
    getProducts(store_id).then((data) => {
      isMounted && setData(data);
    });

    return () => {
      isMounted = false;
    };
  }, [data, store_id]);

  return {
    data,
    loading: data === undefined,
    refresh: () => setData(undefined),
  };
}
