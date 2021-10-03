import { Suspense } from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
  return (
    <>
      <header>
        <Link to="/">Tienda Libre</Link>
      </header>
      <main>
        <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
      </main>
    </>
  );
}
