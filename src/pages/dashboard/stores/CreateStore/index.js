import { MY_STORES } from '@/constants/routes';
import { createStore } from '@/firebase/stores';
import useDashboard from '@/hooks/useDashboard';
import { useRef } from 'react';
import { useHistory } from 'react-router';

const inputs = [
  {
    label: 'Nombre de tu tienda',
    inputProps: { type: 'text', name: 'name', id: 'name' },
  },
  {
    label: 'E-Mail de ventas',
    inputProps: { type: 'text', name: 'email', id: 'email' },
  },
  { label: 'Slug', inputProps: { type: 'text', name: 'slug', id: 'slug' } },
];

export default function CreateStore() {
  const inputsRef = useRef({});
  const submitRef = useRef(null);
  const formRef = useRef(null);
  const { refreshStores } = useDashboard();
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    submitRef.current.disabled = true;

    const data = {};
    inputs.map((item) => {
      data[item.inputProps.name] =
        inputsRef.current[item.inputProps.name].value;
    });

    createStore(data)
      .then(async () => {
        await refreshStores();
        formRef.current.reset();
        history.push(MY_STORES);
      })
      .catch(() => {
        submitRef.current.disabled = false;
      });
  };

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      {inputs.map((item) => (
        <div key={item.inputProps.id}>
          <label htmlFor={item.inputProps.id}>{item.label}</label>
          <input
            ref={(el) => (inputsRef.current[item.inputProps.name] = el)}
            {...item.inputProps}
          />
        </div>
      ))}
      <button ref={submitRef} type="submit">
        Enviar
      </button>
    </form>
  );
}
