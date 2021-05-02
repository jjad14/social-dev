import api from '../utils/api';
import * as types from '../actions/types';
import { setAlert } from './alert';

// Get users current profile
export const getCurrentProfile = () => async dispatch => {
    try {
        // call api to get profile
        const res = await api.get('/profile/me');
    
        dispatch({
          type: types.GET_PROFILE,
          payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: { 
                msg: err.response.data.msg, 
                status: err.response.status 
            }
        });
    }
};

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        // call api to create/update profile
        const res = await api.post('/profile', formData);
    
        dispatch({
          type: types.GET_PROFILE,
          payload: res.data
        });
    
        // display alert corresponding to operation
        dispatch(setAlert(edit 
            ? 'Profile Updated' 
            : 'Profile Created', 'success'
        ));
    
        // if user is creating a profile, redirect after success
        if (!edit) {
          history.push('/dashboard');
          // return <Redirect to='/dashboard'></Redirect>;
        }
      } catch (err) {
        const errors = err.response.data.errors;
    
        if (errors) {
            errors.forEach((error) => dispatch(
              setAlert(error.msg, 'danger'))
            );
        }
    
        dispatch({
          type: types.PROFILE_ERROR,
          payload: { msg: err.response.data.msg, status: err.response.status }
        });
      }
};