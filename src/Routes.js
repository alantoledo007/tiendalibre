import { BrowserRouter, Switch, Route } from 'react-router-dom';
import renderRoutes from './utils/renderRoutes';
import { lazy, useEffect } from 'react';
import LayoutProvider from './providers/LayoutProvider';
import useLayout from './hooks/useLayout';
import LayoutCustomer from './customers/LayoutCustomer';

const Home = lazy(() => import('./pages/landing/Home'));
const FAQs = lazy(() => import('./pages/landing/FAQs'));
const Contact = lazy(() => import('./pages/landing/Contact'));
const Prices = lazy(() => import('./pages/landing/Prices'));
const About = lazy(() => import('./pages/landing/About'));
const Register = lazy(() => import('./pages/auth/Register'));
const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Error404 = lazy(() => import('./pages/Error404'));

export default function Routes() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <LayoutCustomer>
          <Switch>
            {renderRoutes(landing_routes)}
            <Route path="*" component={Error404} />
          </Switch>
        </LayoutCustomer>
      </LayoutProvider>
    </BrowserRouter>
  );
}

const LayoutResolver = (Component, layout) => (props) => {
  const { layout: current, setLayout } = useLayout();
  useEffect(() => {
    if (current === layout) return;
    setLayout(layout);
  }, [current]);

  if (current !== layout) return null;
  return <Component {...props} />;
};

const landing_routes = [
  { path: '/', component: () => LayoutResolver(Home, 'landing'), exact: true },
  {
    path: '/nosotros',
    component: () => LayoutResolver(About, 'landing'),
    exact: true,
  },
  {
    path: '/planes-y-precios',
    component: () => LayoutResolver(Prices, 'landing'),
    exact: true,
  },
  {
    path: '/preguntas-frecuentes',
    component: () => LayoutResolver(FAQs, 'landing'),
    exact: true,
  },
  {
    path: '/contacto',
    component: () => LayoutResolver(Contact, 'landing'),
    exact: true,
  },
  {
    path: '/registrarse',
    component: () => LayoutResolver(Register, 'auth'),
    exact: true,
  },
  {
    path: '/ingresar',
    component: () => LayoutResolver(Login, 'auth'),
    exact: true,
  },
  {
    path: '/recuperar-clave',
    component: () => LayoutResolver(ForgotPassword, 'auth'),
    exact: true,
  },
];
