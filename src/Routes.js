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
  DASHBOARD as DASHBOARD_PATH,
  MY_STORES,
  CREATE_STORE,
  UPDATE_STORE,
  STORE_DETAILS,
  DELETE_STORE,
} from './constants/routes';
import {
  AUTH,
  LANDING,
  DASHBOARD as DASHBOARD_LAYOUT,
} from './constants/layouts';

//Landing
const Home = lazy(() => import('./pages/landing/Home'));
const FAQs = lazy(() => import('./pages/landing/FAQs'));
const Contact = lazy(() => import('./pages/landing/Contact'));
const Prices = lazy(() => import('./pages/landing/Prices'));
const About = lazy(() => import('./pages/landing/About'));

//Auth
const Register = lazy(() => import('./pages/auth/Register'));
const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

//Dashborad
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const MyStores = lazy(() => import('./pages/dashboard/stores/MyStores'));
const CreateStore = lazy(() => import('./pages/dashboard/stores/CreateStore'));
const DeleteStore = lazy(() => import('./pages/dashboard/stores/DeleteStore'));
const UpdateStore = lazy(() => import('./pages/dashboard/stores/UpdateStore'));
const StoreDetails = lazy(() =>
  import('./pages/dashboard/stores/StoreDetails'),
);

//Errors
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
  //LANDING
  { path: HOME, component: () => LayoutResolver(Home, LANDING), exact: true },
  {
    path: ABOUT,
    component: () => LayoutResolver(About, LANDING),
    exact: true,
  },
  {
    path: PRICES,
    component: () => LayoutResolver(Prices, LANDING),
    exact: true,
  },
  {
    path: FAQs_ROUTE,
    component: () => LayoutResolver(FAQs, LANDING),
    exact: true,
  },
  {
    path: CONTACT,
    component: () => LayoutResolver(Contact, LANDING),
    exact: true,
  },

  //AUTH
  {
    path: REGISTER,
    component: () => LayoutResolver(Register, AUTH),
    exact: true,
  },
  {
    path: LOGIN,
    component: () => LayoutResolver(Login, AUTH),
    exact: true,
  },
  {
    path: FORGOT_PASSWORD,
    component: () => LayoutResolver(ForgotPassword, AUTH),
    exact: true,
  },

  //DASHBOARD
  {
    path: DASHBOARD_PATH,
    component: () => LayoutResolver(Dashboard, DASHBOARD_LAYOUT),
    exact: true,
  },
  {
    path: MY_STORES,
    component: () => LayoutResolver(MyStores, DASHBOARD_LAYOUT),
    exact: true,
  },
  {
    path: CREATE_STORE,
    component: () => LayoutResolver(CreateStore, DASHBOARD_LAYOUT),
    exact: true,
  },
  {
    path: UPDATE_STORE,
    component: () => LayoutResolver(UpdateStore, DASHBOARD_LAYOUT),
    exact: true,
  },
  {
    path: DELETE_STORE,
    component: () => LayoutResolver(DeleteStore, DASHBOARD_LAYOUT),
    exact: true,
  },
  {
    path: STORE_DETAILS,
    component: () => LayoutResolver(StoreDetails, DASHBOARD_LAYOUT),
    exact: true,
  },
];
