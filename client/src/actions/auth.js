import api from '../utils/api';
import * as types from '../actions/types';
import { setAlert } from './alert';

// Load the User
export const loadUser = () => async dispatch => {
    try {
      const res = await api.get('/auth');
  
      dispatch({
        type: types.USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: types.AUTH_ERROR
      });
    }
  };

// Register the User
export const register = (formData) => async dispatch => {
    try {
      // http post request to /api/users
      const res = await api.post('/users', formData);

      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());

    }
    catch (err) {
      const errors = err.response.data.errors;
  
      // show alert for each in array (errors is an array)
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: types.REGISTER_FAIL
      });
    }
};

// Login User
export const login = (email, password) => async dispatch => {
    const body = { email, password };
  
    try {
      const res = await api.post('/auth', body);
  
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());

    }
    catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: types.LOGIN_FAIL
      });
    }
  };

  // Logout
export const logout = () => ({ type: types.LOGOUT });