import { getOrders } from '@/firebase/orders';
import { useEffect, useState } from 'react';

export default function useOrders(store_id, config = {}) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (data !== undefined) return;
    let isMounted = true;
    getOrders(store_id, config).then((data) => {
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
