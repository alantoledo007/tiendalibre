import { STORE_DETAILS } from '@/constants/routes';
import useDashboard from '@/hooks/useDashboard';
import { Link } from 'react-router-dom';

export default function MyStores() {
  const {
    stores: { data, loading },
  } = useDashboard();
  return (
    <>
      <p>MyStores</p>
      {loading ? (
        <div>cargando...</div>
      ) : (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <span>{item.name}</span>{' '}
              <Link to={STORE_DETAILS.replace(':id', item.id)}>ir</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
