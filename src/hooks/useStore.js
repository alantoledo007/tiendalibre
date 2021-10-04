import { getStore } from '@/firebase/stores';
import { useEffect, useState } from 'react';

export default function useStore(id) {
  const [data, setData] = useState(undefined);
  const [cache, setCache] = useState(undefined);

  useEffect(() => {
    if (data !== undefined || id === undefined) return;
    if (cache !== undefined) {
      if (id === cache?.id) {
        setData(cache);
        return;
      }
    }
    let isMounted = true;
    getStore(id).then((data) => {
      if (isMounted) {
        setData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id, cache, data]);

  useEffect(() => {
    if (data === undefined) return;
    setCache(data);
  }, [data]);

  useEffect(() => {
    if (data === undefined) return;
    setData(undefined);
  }, [id]);

  return {
    data,
    loading: data === undefined,
    exists: data !== null && data !== undefined,
  };
}
