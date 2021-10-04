import { STORE_DETAILS } from '@/constants/routes';
import { updateStore } from '@/firebase/stores';
import useStore from '@/hooks/useStore';
import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const inputs = [
  {
    label: 'Nombre de tu tienda',
    inputProps: { type: 'text', name: 'name', id: 'name' },
  },
  { label: 'Slug', inputProps: { type: 'text', name: 'slug', id: 'slug' } },
];

export default function UpdateStore() {
  const history = useHistory();
  const { id } = useParams();
  const { data, loading, exists } = useStore(id);
  const submitRef = useRef(null);
  const inputsRef = useRef({});

  const onSubmit = (e) => {
    e.preventDefault();
    submitRef.current.disabled = true;

    const data = {};
    inputs.map((item) => {
      data[item.inputProps.name] =
        inputsRef.current[item.inputProps.name].value;
    });

    updateStore(id, data)
      .then(() => {
        history.push(STORE_DETAILS.replace(':id', id));
      })
      .catch(() => {
        submitRef.current.disabled = false;
      });
  };

  return (
    <>
      <p>UpdateStore</p>
      {loading ? (
        <div>cargando...</div>
      ) : !exists ? (
        <div>Tienda no encontrada</div>
      ) : (
        <form onSubmit={onSubmit}>
          {inputs.map((item) => (
            <div key={item.inputProps.id}>
              <label htmlFor={item.inputProps.id}>{item.label}</label>
              <input
                ref={(el) => (inputsRef.current[item.inputProps.name] = el)}
                {...item.inputProps}
                defaultValue={data[item.inputProps.name]}
              />
            </div>
          ))}
          <button ref={submitRef} type="submit">
            Modificar
          </button>
        </form>
      )}
    </>
  );
}
