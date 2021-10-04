import { useEffect } from 'react';
import useDashboard from './useDashboard';

export default function useDashboardStore(id) {
  const { store, setStoreId } = useDashboard();

  useEffect(() => {
    setStoreId(id);
  }, [id]);

  return store;
}
