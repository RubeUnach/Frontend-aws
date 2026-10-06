import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import {
  authService
} from '../services/auth.service';


const AuthContext =
  createContext(null);


export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function restoreSession() {

      const token =
        authService.getToken();


      if (!token) {
        setLoading(false);
        return;
      }


      try {

        const currentUser =
          await authService
            .getCurrentUser();

        setUser(
          currentUser
        );

      } catch {

        authService.logout();

        setUser(null);

      } finally {

        setLoading(false);

      }
    }


    restoreSession();

  }, []);


  async function login(
    username,
    password
  ) {

    await authService.login(
      username,
      password
    );


    /*
     * No confiamos únicamente
     * en la respuesta del login.
     *
     * Consultamos /auth/me para
     * recuperar el estado vigente.
     */
    const currentUser =
      await authService
        .getCurrentUser();


    setUser(
      currentUser
    );


    return currentUser;
  }


  function logout() {

    authService.logout();

    setUser(null);

  }


  const authenticated =
    Boolean(user);


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {

  const context =
    useContext(AuthContext);


  if (!context) {
    throw new Error(
      'useAuth debe utilizarse dentro de AuthProvider'
    );
  }


  return context;
}
