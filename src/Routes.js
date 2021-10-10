import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
  DASHBOARD_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DASHBOARD_PRODUCT_DETAILS,
  STORE,
  PRODUCT,
  CART,
} from './constants/routes';
import {
  AUTH,
  LANDING,
  DASHBOARD as DASHBOARD_LAYOUT,
} from './constants/layouts';
import useUser from './hooks/useUser';

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
const DashboardProducts = lazy(() =>
  import('./pages/dashboard/stores/products/Products'),
);
const CreateProduct = lazy(() =>
  import('./pages/dashboard/stores/products/CreateProduct'),
);
const DeleteProduct = lazy(() =>
  import('./pages/dashboard/stores/products/DeleteProduct'),
);
const UpdateProduct = lazy(() =>
  import('./pages/dashboard/stores/products/UpdateProduct'),
);
const DashboardProductDetails = lazy(() =>
  import('./pages/dashboard/stores/products/ProductDetails'),
);

//Market
const Store = lazy(() => import('./pages/market/Store'));
const Product = lazy(() => import('./pages/market/Product'));
const Cart = lazy(() => import('./pages/market/Cart'));

//Errors
const Error404 = lazy(() => import('./pages/Error404'));

export default function Routes() {
  const user = useUser();
  return (
    <BrowserRouter>
      <LayoutProvider>
        <LayoutCustomer>
          <Switch>
            {user.isUnknow && <Route path="*">cargando...</Route>}
            {renderRoutes(landing_routes, user)}
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

const authHandler = (Component) => (user) =>
  !user.isAuthenticated ? Component : () => <Redirect to={DASHBOARD_PATH} />;

const dashboardHandler = (Component) => (user) =>
  user.isAuthenticated ? Component : () => <Redirect to={LOGIN} />;

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
    component: authHandler(LayoutResolver(Register, AUTH)),
    exact: true,
  },
  {
    path: LOGIN,
    component: authHandler(LayoutResolver(Login, AUTH)),
    exact: true,
  },
  {
    path: FORGOT_PASSWORD,
    component: authHandler(LayoutResolver(ForgotPassword, AUTH)),
    exact: true,
  },

  //DASHBOARD
  {
    path: DASHBOARD_PATH,
    component: dashboardHandler(LayoutResolver(Dashboard, DASHBOARD_LAYOUT)),
    exact: true,
  },
  {
    path: MY_STORES,
    component: dashboardHandler(LayoutResolver(MyStores, DASHBOARD_LAYOUT)),
    exact: true,
  },
  {
    path: CREATE_STORE,
    component: dashboardHandler(LayoutResolver(CreateStore, DASHBOARD_LAYOUT)),
    exact: true,
  },
  {
    path: UPDATE_STORE,
    component: dashboardHandler(LayoutResolver(UpdateStore, DASHBOARD_LAYOUT)),
    exact: true,
  },
  {
    path: DELETE_STORE,
    component: dashboardHandler(LayoutResolver(DeleteStore, DASHBOARD_LAYOUT)),
    exact: true,
  },
  {
    path: STORE_DETAILS,
    component: dashboardHandler(LayoutResolver(StoreDetails, DASHBOARD_LAYOUT)),
    exact: true,
  },
  {
    path: DASHBOARD_PRODUCTS,
    component: dashboardHandler(
      LayoutResolver(DashboardProducts, DASHBOARD_LAYOUT),
    ),
    exact: true,
  },
  {
    path: CREATE_PRODUCT,
    component: dashboardHandler(
      LayoutResolver(CreateProduct, DASHBOARD_LAYOUT),
    ),
    exact: true,
  },
  {
    path: UPDATE_PRODUCT,
    component: dashboardHandler(
      LayoutResolver(UpdateProduct, DASHBOARD_LAYOUT),
    ),
    exact: true,
  },
  {
    path: DELETE_PRODUCT,
    component: dashboardHandler(
      LayoutResolver(DeleteProduct, DASHBOARD_LAYOUT),
    ),
    exact: true,
  },
  {
    path: DASHBOARD_PRODUCT_DETAILS,
    component: dashboardHandler(
      LayoutResolver(DashboardProductDetails, DASHBOARD_LAYOUT),
    ),
    exact: true,
  },

  //MARKET
  {
    path: CART,
    component: () => LayoutResolver(Cart, AUTH),
    exact: true,
  },
  {
    path: STORE,
    component: () => LayoutResolver(Store, AUTH),
    exact: true,
  },
  {
    path: PRODUCT,
    component: () => LayoutResolver(Product, AUTH),
    exact: true,
  },
];
