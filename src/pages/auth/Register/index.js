import { registerWithEmailAndPassword } from '@/firebase/auth';
import { useRef } from 'react';

const inputs = [
  {
    label: 'Nombre',
    inputProps: { type: 'text', name: 'name', id: 'name' },
  },
  {
    label: 'Apellido',
    inputProps: { type: 'text', name: 'surname', id: 'surname' },
  },
  { label: 'E-Mail', inputProps: { type: 'text', name: 'email', id: 'email' } },
  {
    label: 'Contraseña',
    inputProps: { type: 'password', name: 'password', id: 'password' },
  },
];

export default function Register() {
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

    registerWithEmailAndPassword(data).catch(() => {
      submitRef.current.disabled = false;
    });
  };

  return (
    <div>
      <div>Register</div>
      <div>
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
            Crearse una cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
