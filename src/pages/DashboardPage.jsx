import Navbar from
  '../components/Navbar';

import {
  useAuth
} from '../context/AuthContext';


export default function DashboardPage() {

  const {
    user
  } = useAuth();


  return (
    <div className="dashboard-page">

      <Navbar />


      <main className="dashboard-content">

        <section className="welcome-card">

          <p className="eyebrow">
            DASHBOARD PROTEGIDO
          </p>

          <h1>
            Bienvenido, {user.username}
          </h1>

          <p>
            La sesión fue validada por
            el Backend mediante JWT.
          </p>

        </section>


        <section className="dashboard-grid">

          <article className="info-card">

            <h2>
              Identidad
            </h2>

            <dl>

              <div>
                <dt>
                  Usuario
                </dt>

                <dd>
                  {user.username}
                </dd>
              </div>


              <div>
                <dt>
                  Correo
                </dt>

                <dd>
                  {user.email}
                </dd>
              </div>


              <div>
                <dt>
                  Rol
                </dt>

                <dd>
                  {user.role}
                </dd>
              </div>


              <div>
                <dt>
                  Estado
                </dt>

                <dd>
                  {
                    user.active
                      ? 'Activo'
                      : 'Inactivo'
                  }
                </dd>
              </div>

            </dl>

          </article>


          <article className="info-card">

            <h2>
              Controles activos
            </h2>

            <ul className="security-list">

              <li>
                JWT validado
              </li>

              <li>
                Usuario revalidado
                contra PostgreSQL
              </li>

              <li>
                Autorización por rol
              </li>

              <li>
                Auditoría de sesión
              </li>

              <li>
                Rate limiting
              </li>

            </ul>

          </article>

        </section>

      </main>

    </div>
  );
}
