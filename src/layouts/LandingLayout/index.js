import {
  ABOUT,
  CONTACT,
  FAQs,
  HOME,
  LOGIN,
  PRICES,
  REGISTER,
} from '@/constants/routes';
import { Suspense } from 'react';
import { NavLink } from 'react-router-dom';

export default function LandingLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={HOME}>Inicio</NavLink>
            </li>
            <li>
              <NavLink to={CONTACT}>Contacto</NavLink>
            </li>
            <li>
              <NavLink to={ABOUT}>Nosotros</NavLink>
            </li>
            <li>
              <NavLink to={PRICES}>Precios</NavLink>
            </li>
            <li>
              <NavLink to={FAQs}>Preguntas frecuentes</NavLink>
            </li>
            <li>
              <NavLink to={REGISTER}>Crearse una cuenta</NavLink>
            </li>
            <li>
              <NavLink to={LOGIN}>Ingresar</NavLink>
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
