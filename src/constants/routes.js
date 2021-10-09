//LANDING
export const HOME = '/';
export const ABOUT = '/nosotros';
export const PRICES = '/planes-y-precios';
export const FAQs = '/preguntas-frecuentes';
export const CONTACT = '/contacto';

//AUTH
export const REGISTER = '/registrarse';
export const LOGIN = '/ingresar';
export const FORGOT_PASSWORD = '/recuperar-clave';

//DASHBOARD
export const DASHBOARD = '/tablero';
export const MY_STORES = `${DASHBOARD}/mis-tiendas`;
export const CREATE_STORE = `${DASHBOARD}/mis-tiendas/nueva`;
export const UPDATE_STORE = `${DASHBOARD}/mis-tiendas/:id/modificar`;
export const DELETE_STORE = `${DASHBOARD}/mis-tiendas/:id/borrar`;
export const STORE_DETAILS = `${DASHBOARD}/mis-tiendas/:id`;
export const DASHBOARD_PRODUCTS = `${MY_STORES}/:store_id/productos`;
export const CREATE_PRODUCT = `${MY_STORES}/:store_id/productos/nuevo`;
export const UPDATE_PRODUCT = `${MY_STORES}/:store_id/productos/:product_id/modificar`;
export const DELETE_PRODUCT = `${MY_STORES}/:store_id/productos/:product_id/borrar`;
export const DASHBOARD_PRODUCT_DETAILS = `${MY_STORES}/:store_id/productos/:product_id`;

//MARKET
export const STORE = '/:slug';
export const PRODUCT = `${STORE}/:product_slug`;
export const CART = `${STORE}/carrito`;
