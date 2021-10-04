import { useEffect } from 'react';
import useDashboard from './useDashboard';

export default function useDashboardStoreUnmount() {
  const { setStoreId } = useDashboard();

  useEffect(() => {
    return () => {
      setStoreId(undefined);
    };
  }, []);
}
