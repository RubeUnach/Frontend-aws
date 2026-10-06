import {
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import {
  api
} from '../services/api';

import Navbar from
  '../components/Navbar';


export default function UsersPage() {

  const navigate =
    useNavigate();


  const [
    users,
    setUsers
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState('');


  useEffect(() => {

    async function loadUsers() {

      try {

        const response =
          await api.get(
            '/usuarios',
            {
              auth: true
            }
          );


        setUsers(
          response.data || []
        );

      } catch (error) {

        if (
          error.status === 403
        ) {
          navigate(
            '/forbidden',
            {
              replace: true
            }
          );

          return;
        }


        setError(
          'No fue posible cargar los usuarios.'
        );

      } finally {

        setLoading(false);

      }
    }


    loadUsers();

  }, [navigate]);


  return (
    <div className="dashboard-page">

      <Navbar />


      <main className="dashboard-content">

        <section className="welcome-card">

          <p className="eyebrow">
            ADMINISTRACIÓN
          </p>

          <h1>
            Usuarios
          </h1>

          <p>
            Recurso disponible únicamente
            para administradores.
          </p>

        </section>


        <section className="users-card">

          {
            loading &&
            <p>
              Cargando usuarios...
            </p>
          }


          {
            error &&
            <div className="login-error">
              {error}
            </div>
          }


          {
            !loading &&
            !error &&
            (
              <div className="table-wrapper">

                <table className="users-table">

                  <thead>

                    <tr>
                      <th>ID</th>
                      <th>Usuario</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Estado</th>
                    </tr>

                  </thead>


                  <tbody>

                    {
                      users.map(
                        user => (
                          <tr key={user.id}>

                            <td>
                              {user.id}
                            </td>

                            <td>
                              {user.username}
                            </td>

                            <td>
                              {user.email}
                            </td>

                            <td>
                              {user.role}
                            </td>

                            <td>
                              {
                                user.active
                                  ? 'Activo'
                                  : 'Inactivo'
                              }
                            </td>

                          </tr>
                        )
                      )
                    }

                  </tbody>

                </table>

              </div>
            )
          }

        </section>

      </main>

    </div>
  );
}
