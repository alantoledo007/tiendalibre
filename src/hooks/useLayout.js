import { LayoutContext } from '@/providers/LayoutProvider';
import { useContext } from 'react';

export default function useLayout() {
  const context = useContext(LayoutContext);
  return context;
}
