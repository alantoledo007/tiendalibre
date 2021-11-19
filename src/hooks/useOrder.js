import ORDER_STATES from '@/constants/order_states';
import { getOrder, updateOrder } from '@/firebase/orders';
import { updateProductStock } from '@/firebase/products';
import { useEffect, useState } from 'react';

export default function useOrder(id, config = {}) {
  const [data, setData] = useState(undefined);
  const [cache, setCache] = useState(undefined);

  console.log(data);

  useEffect(() => {
    if (data !== undefined || id === undefined) return;
    if (cache !== undefined) {
      if (id === cache?.id) {
        setData(cache);
        return;
      }
    }
    let isMounted = true;
    getOrder(id, config).then((data) => {
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

  const updateStatus = (buttonsRef, status) => {
    Object.values(buttonsRef.current).forEach((item) => {
      if (item) {
        item.disabled = true;
      }
    });
    return updateOrder(id, status)
      .then(() => {
        setCache(undefined);
        setData(undefined);

        if (status === ORDER_STATES.COMPLETED) {
          data.items.forEach((item) => {
            updateProductStock(item.id, item.quantity);
          });
        }
      })
      .catch(() => {
        Object.values(buttonsRef.current).forEach((item) => {
          if (item) {
            item.disabled = false;
          }
        });
      });
  };

  return {
    data,
    loading: data === undefined,
    exists: data !== null && data !== undefined,
    updateStatus,
  };
}
