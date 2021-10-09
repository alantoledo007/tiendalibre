import { loginWithEmailAndPassword } from '@/firebase/auth';
import { useRef } from 'react';

const inputs = [
  { label: 'E-Mail', inputProps: { type: 'text', name: 'email', id: 'email' } },
  {
    label: 'Contraseña',
    inputProps: { type: 'password', name: 'password', id: 'password' },
  },
];

export default function Login() {
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

    loginWithEmailAndPassword(data).catch(() => {
      submitRef.current.disabled = false;
    });
  };

  return (
    <div>
      <div>Login</div>
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
