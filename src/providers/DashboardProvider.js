import useStore from '@/hooks/useStore';
import useStores from '@/hooks/useStores';
import { createContext, useState } from 'react';

export const DashboardContext = createContext();

export default function DashboardProvider({ children }) {
  const stores = useStores();
  const [storeId, setStoreId] = useState(undefined);
  const store = useStore(storeId);

  const refreshStores = () => {
    setStoreId(undefined);
    stores.refresh();
  };

  return (
    <DashboardContext.Provider
      value={{
        stores,
        store,
        setStoreId,
        refreshStores,
      }}>
      {children}
    </DashboardContext.Provider>
  );
}
