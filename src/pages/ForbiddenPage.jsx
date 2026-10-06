import {
  useNavigate
} from 'react-router-dom';


export default function ForbiddenPage() {

  const navigate =
    useNavigate();


  return (
    <main className="error-page">

      <section className="error-card">

        <p className="error-code">
          403
        </p>

        <h1>
          Acceso denegado
        </h1>

        <p>
          Su identidad fue autenticada,
          pero no cuenta con los permisos
          necesarios para acceder a este
          recurso.
        </p>


        <button
          type="button"
          onClick={
            () =>
              navigate(
                '/dashboard'
              )
          }
        >
          Volver al Dashboard
        </button>

      </section>

    </main>
  );
}
