import {
  Navigate
} from 'react-router-dom';

import {
  useAuth
} from '../context/AuthContext';


export default function RoleRoute({
  allowedRoles,
  children
}) {

  const {
    user,
    loading
  } = useAuth();


  if (loading) {
    return (
      <div className="loading-screen">
        Verificando permisos...
      </div>
    );
  }


  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  if (
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/forbidden"
        replace
      />
    );
  }


  return children;
}
