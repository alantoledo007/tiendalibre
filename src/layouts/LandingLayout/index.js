import { Suspense } from 'react';
import { NavLink } from 'react-router-dom';

export default function LandingLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/contacto">Contacto</NavLink>
            </li>
            <li>
              <NavLink to="/nosotros">Nosotros</NavLink>
            </li>
            <li>
              <NavLink to="/planes-y-precios">Precios</NavLink>
            </li>
            <li>
              <NavLink to="/preguntas-frecuentes">Preguntas frecuentes</NavLink>
            </li>
            <li>
              <NavLink to="/registrarse">Crearse una cuenta</NavLink>
            </li>
            <li>
              <NavLink to="/ingresar">Ingresar</NavLink>
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
