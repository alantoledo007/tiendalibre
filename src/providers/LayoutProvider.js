import { createContext, useState } from 'react';

export const LayoutContext = createContext();

export default function LayoutProvider({ children }) {
  const [layout, setLayout] = useState();

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
