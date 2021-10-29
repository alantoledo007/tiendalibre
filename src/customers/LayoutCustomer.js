import { AUTH, DASHBOARD, LANDING, MARKET } from '@/constants/layouts';
import { LayoutContext } from '@/providers/LayoutProvider';
import { Suspense } from 'react';
import { lazy } from 'react';

const LandingLayout = lazy(() => import('@/layouts/LandingLayout'));
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const MarketLayout = lazy(() => import('@/layouts/MarketLayout'));

export default function LayoutCustomer({ children }) {
  const resolver = (layout) => {
    return <LayoutSuspense Layout={layout}>{children}</LayoutSuspense>;
  };

  return (
    <LayoutContext.Consumer>
      {({ layout }) => {
        if (layout === LANDING) return resolver(LandingLayout);
        if (layout === AUTH) return resolver(AuthLayout);
        if (layout === DASHBOARD) return resolver(DashboardLayout);
        if (layout === MARKET) return resolver(MarketLayout);
        return resolver();
      }}
    </LayoutContext.Consumer>
  );
}

const LayoutSuspense = ({ Layout, children }) => (
  <Suspense fallback={<div>cargando layout...</div>}>
    {Layout ? <Layout>{children}</Layout> : children}
  </Suspense>
);
