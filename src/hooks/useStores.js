import { getStores } from '@/firebase/stores';
import { useEffect, useState } from 'react';

export default function useStores() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    getStores().then((data) => {
      setData(data);
    });
  }, []);

  return { data, loading: data === undefined };
}
