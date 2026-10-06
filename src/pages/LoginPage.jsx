import {
  useState
} from 'react';

import {
  Navigate,
  useNavigate
} from 'react-router-dom';

import {
  useAuth
} from '../context/AuthContext';


export default function LoginPage() {

  const navigate =
    useNavigate();

  const {
    login,
    authenticated,
    loading
  } = useAuth();


  const [
    username,
    setUsername
  ] = useState('');


  const [
    password,
    setPassword
  ] = useState('');


  const [
    error,
    setError
  ] = useState('');


  const [
    submitting,
    setSubmitting
  ] = useState(false);


  if (
    !loading &&
    authenticated
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }


  async function handleSubmit(event) {

    event.preventDefault();

    setError('');
    setSubmitting(true);


    try {

      await login(
        username,
        password
      );


      navigate(
        '/dashboard',
        {
          replace: true
        }
      );

    } catch (error) {

      if (
        error.code ===
        'INVALID_CREDENTIALS'
      ) {
        setError(
          'Usuario o contraseña incorrectos.'
        );

      } else if (
        error.code ===
        'ACCOUNT_DISABLED'
      ) {
        setError(
          'La cuenta no se encuentra disponible.'
        );

      } else if (
        error.code ===
        'IP_TEMPORARILY_BLOCKED' ||
        error.code ===
        'TOO_MANY_LOGIN_ATTEMPTS'
      ) {
        setError(
          'Demasiados intentos. Intente nuevamente más tarde.'
        );

      } else {

        setError(
          'No fue posible iniciar sesión.'
        );

      }

    } finally {

      setSubmitting(false);

    }
  }


  return (
    <main className="login-page">

      <section className="login-card">

        <div className="login-brand">
          <div className="security-icon">
            ZT
          </div>

          <h1>
            Acceso seguro
          </h1>

          <p>
            Arquitectura Zero Trust
          </p>
        </div>


        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <label>
            Usuario

            <input
              type="text"
              value={username}
              onChange={
                event =>
                  setUsername(
                    event.target.value
                  )
              }
              autoComplete="username"
              required
            />
          </label>


          <label>
            Contraseña

            <input
              type="password"
              value={password}
              onChange={
                event =>
                  setPassword(
                    event.target.value
                  )
              }
              autoComplete="current-password"
              required
            />
          </label>


          {error && (
            <div
              className="login-error"
              role="alert"
            >
              {error}
            </div>
          )}


          <button
            type="submit"
            disabled={submitting}
          >
            {
              submitting
                ? 'Verificando...'
                : 'Iniciar sesión'
            }
          </button>

        </form>


        <div className="login-security">

          <span>
            🔒
          </span>

          <span>
            Acceso protegido mediante JWT
          </span>

        </div>

      </section>

    </main>
  );
}
