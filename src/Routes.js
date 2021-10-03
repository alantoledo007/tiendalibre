import { BrowserRouter, Switch, Route } from 'react-router-dom';
import renderRoutes from './utils/renderRoutes';
import { lazy, useEffect } from 'react';
import LayoutProvider from './providers/LayoutProvider';
import useLayout from './hooks/useLayout';
import LayoutCustomer from './customers/LayoutCustomer';
import {
  CONTACT,
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  FAQs as FAQs_ROUTE,
  PRICES,
  ABOUT,
  HOME,
} from './constants/routes';

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
  { path: HOME, component: () => LayoutResolver(Home, 'landing'), exact: true },
  {
    path: ABOUT,
    component: () => LayoutResolver(About, 'landing'),
    exact: true,
  },
  {
    path: PRICES,
    component: () => LayoutResolver(Prices, 'landing'),
    exact: true,
  },
  {
    path: FAQs_ROUTE,
    component: () => LayoutResolver(FAQs, 'landing'),
    exact: true,
  },
  {
    path: CONTACT,
    component: () => LayoutResolver(Contact, 'landing'),
    exact: true,
  },
  {
    path: REGISTER,
    component: () => LayoutResolver(Register, 'auth'),
    exact: true,
  },
  {
    path: LOGIN,
    component: () => LayoutResolver(Login, 'auth'),
    exact: true,
  },
  {
    path: FORGOT_PASSWORD,
    component: () => LayoutResolver(ForgotPassword, 'auth'),
    exact: true,
  },
];
