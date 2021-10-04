import { getStores } from '@/firebase/stores';
import { useEffect, useState } from 'react';

export default function useStores() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    let isMount = true;
    getStores().then((data) => {
      isMount && setData(data);
    });

    return () => {
      isMount = false;
    };
  }, []);

  return { data, loading: data === undefined };
}
