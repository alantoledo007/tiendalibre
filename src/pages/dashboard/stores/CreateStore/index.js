import { useRef } from 'react';

const inputs = [
  {
    label: 'Nombre de tu tienda',
    inputProps: { type: 'text', name: 'name', id: 'name' },
  },
  { label: 'Slug', inputProps: { type: 'text', name: 'slug', id: 'slug' } },
];

export default function CreateStore() {
  const inputsRef = useRef({});
  const submitRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    submitRef.current.disabled = true;

    const data = {};
    inputs.map((item) => {
      data[item.inputProps.name] =
        inputsRef.current[item.inputProps.name].value;
    });

    console.log(data);
  };

  return (
    <form onSubmit={onSubmit}>
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
