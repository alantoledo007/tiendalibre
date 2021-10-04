import { getStores } from '@/firebase/stores';
import { useEffect, useState } from 'react';

export default function useStores() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    getStores().then((data) => {
      isMounted && setData(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading: data === undefined };
}
