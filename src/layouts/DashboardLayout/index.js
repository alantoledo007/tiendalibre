import { CREATE_STORE, DASHBOARD, MY_STORES } from '@/constants/routes';
import DashboardProvider from '@/providers/DashboardProvider';
import { NavLink } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={DASHBOARD}>Tablero</NavLink>
            </li>
            <li>
              <NavLink to={MY_STORES}>Mis tiendas</NavLink>
              <ul>
                <li>
                  <NavLink to={CREATE_STORE}>Nueva tienda</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <button>Cerrar sesión</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </DashboardProvider>
  );
}
