import { getStore } from '@/firebase/stores';
import { useEffect, useState } from 'react';

export default function useStore(id, config = {}) {
  const [data, setData] = useState(undefined);
  const [cache, setCache] = useState(undefined);
  const identificationResolver = () => {
    if (config.slug === true) {
      return 'slug';
    }
    return 'id';
  };

  useEffect(() => {
    if (data !== undefined || id === undefined) return;
    if (cache !== undefined) {
      if (id === cache[identificationResolver()]) {
        setData(cache);
        return;
      }
    }
    let isMounted = true;
    getStore(id, config).then((data) => {
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
