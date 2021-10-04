import { DashboardContext } from '@/providers/DashboardProvider';
import { useContext } from 'react';

export default function useDashboard() {
  const ctx = useContext(DashboardContext);
  return ctx;
}
