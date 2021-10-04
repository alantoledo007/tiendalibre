import useStores from '@/hooks/useStores';

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
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
    </>
  );
}
