import { getStore } from '@/firebase/stores';
import { useEffect, useState } from 'react';

export default function useStore(id) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    getStore(id).then((data) => {
      isMounted && setData(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    loading: data === undefined,
    exists: data !== null && data !== undefined,
  };
}
