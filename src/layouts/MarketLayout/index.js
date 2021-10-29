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
      <main>
        <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
      </main>
    </>
  );
}
