import { HOME } from '@/constants/routes';
import { Suspense } from 'react';
import { NavLink } from 'react-router-dom';

export default function MarketLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={HOME}>Tiendalibre</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense fallback={<div>Cargando...</div>}>
        <main className="px-5">{children}</main>
      </Suspense>
    </>
  );
}
