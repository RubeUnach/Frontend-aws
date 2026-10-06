import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from '../components/ProtectedRoute';
import UsersPage from '../pages/UsersPage';
import ForbiddenPage from '../pages/ForbiddenPage';
import RoleRoute from '../components/RoleRoute';

export default function AppRouter() {

  return (
    <Routes>

      <Route
        path="/login"
        element={
          <LoginPage />
        }
      />


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />


      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>

            <RoleRoute
              allowedRoles={[
                'admin'
              ]}
            >

              <UsersPage />

            </RoleRoute>

          </ProtectedRoute>
        }
      />


      <Route
        path="/forbidden"
        element={
          <ProtectedRoute>
            <ForbiddenPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
