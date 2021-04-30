import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

// Axios Configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});


// intercept any error responses from the api and check if the token is no longer valid
api.interceptors.response.use(
  res => res,
  err => {
    // logout the user if the token has expired
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;