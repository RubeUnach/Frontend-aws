import {
  useNavigate
} from 'react-router-dom';

import {
  useAuth
} from '../context/AuthContext';


export default function Navbar() {

  const navigate =
    useNavigate();

  const {
    user,
    logout
  } = useAuth();


  function handleLogout() {

    logout();

    navigate(
      '/login',
      {
        replace: true
      }
    );
  }


  return (
    <header className="navbar">

      <div>
        <strong>
          Zero Trust AWS
        </strong>
      </div>


      <div className="navbar-user">

        <span>
          {user?.username}
        </span>

        <span className="role-badge">
          {user?.role}
        </span>

        <button
          type="button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>

      </div>

    </header>
  );
}
