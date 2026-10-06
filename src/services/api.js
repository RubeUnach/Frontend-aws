const API_BASE_URL = '/api';


function getToken() {
  return sessionStorage.getItem('access_token');
}


async function request(
  endpoint,
  {
    method = 'GET',
    body = null,
    auth = false,
    headers = {}
  } = {}
) {

  const requestHeaders = {
    Accept: 'application/json',
    ...headers
  };


  if (body !== null) {
    requestHeaders['Content-Type'] =
      'application/json';
  }


  if (auth) {
    const token = getToken();

    if (token) {
      requestHeaders.Authorization =
        `Bearer ${token}`;
    }
  }


  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method,
      headers: requestHeaders,

      body:
        body !== null
          ? JSON.stringify(body)
          : undefined
    }
  );


  let data = null;

  const contentType =
    response.headers.get('content-type');


  if (
    contentType &&
    contentType.includes(
      'application/json'
    )
  ) {
    data = await response.json();
  }


  if (!response.ok) {
    const error =
      new Error(
        data?.message ||
        'Error al comunicarse con el servidor'
      );

    error.status =
      response.status;

    error.code =
      data?.error ||
      'API_ERROR';

    error.details =
      data?.details ||
      null;

    throw error;
  }


  return data;
}


export const api = {
  get(endpoint, options = {}) {
    return request(
      endpoint,
      {
        ...options,
        method: 'GET'
      }
    );
  },


  post(
    endpoint,
    body,
    options = {}
  ) {
    return request(
      endpoint,
      {
        ...options,
        method: 'POST',
        body
      }
    );
  },


  put(
    endpoint,
    body,
    options = {}
  ) {
    return request(
      endpoint,
      {
        ...options,
        method: 'PUT',
        body
      }
    );
  },


  patch(
    endpoint,
    body,
    options = {}
  ) {
    return request(
      endpoint,
      {
        ...options,
        method: 'PATCH',
        body
      }
    );
  }
};
