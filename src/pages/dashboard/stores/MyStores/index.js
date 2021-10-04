import { STORE_DETAILS } from '@/constants/routes';
import useStores from '@/hooks/useStores';
import { Link } from 'react-router-dom';

export default function MyStores() {
  const { data, loading } = useStores();
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
