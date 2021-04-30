import api from './api';

const setAuthToken = (token) => {
  // if token exists, add it to the headers of the axios config
  // also add it to local storage
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } 
  else {
    // remove token from header and local storage
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;