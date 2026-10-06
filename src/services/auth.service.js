import { api } from './api';


const TOKEN_KEY =
  'access_token';


function saveToken(token) {
  sessionStorage.setItem(
    TOKEN_KEY,
    token
  );
}


function getToken() {
  return sessionStorage.getItem(
    TOKEN_KEY
  );
}


function removeToken() {
  sessionStorage.removeItem(
    TOKEN_KEY
  );
}


async function login(
  username,
  password
) {

  const response =
    await api.post(
      '/auth/login',
      {
        username,
        password
      }
    );


  const token =
    response?.data?.token;


  if (!token) {
    throw new Error(
      'El servidor no devolvió un token de autenticación'
    );
  }


  saveToken(token);


  return response.data;
}


async function getCurrentUser() {

  const response =
    await api.get(
      '/auth/me',
      {
        auth: true
      }
    );


  return response.data;
}


function logout() {
  removeToken();
}


export const authService = {
  login,
  logout,
  getCurrentUser,
  getToken
};
