import { getStores } from '@/firebase/stores';
import { useEffect, useState } from 'react';

export default function useStores(config = {}) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (data !== undefined) return;
    let isMounted = true;
    getStores(config).then((data) => {
      isMounted && setData(data);
    });

    return () => {
      isMounted = false;
    };
  }, [data]);

  return {
    data,
    loading: data === undefined,
    refresh: () => setData(undefined),
  };
}
