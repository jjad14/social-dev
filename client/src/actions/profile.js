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
  } 
  catch (err) {
    dispatch({
        type: types.PROFILE_ERROR,
        payload: { 
            msg: err.response.data.msg, 
            status: err.response.status 
        }
    });
  }
};

// Get all users profiles
export const getProfiles = () => async dispatch => {

  // Clear current profile
  dispatch({ type: types.CLEAR_PROFILE });

  try {
    // call api to get profiles
    const res = await api.get('/profile');

    //console.log(res);

    dispatch({
      type: types.GET_PROFILES,
      payload: res.data
    });
  } 
  catch (err) {
    console.log(err);
    dispatch({
        type: types.PROFILE_ERROR,
        payload: { 
            msg: err.response.data.msg, 
            status: err.response.status 
        }
    });
  }
};

// Get profile by id
export const getProfileById = (userId) => async dispatch => {
  try {
    // call api to get profile by id
    const res = await api.get(`/profile/user/${userId}`);

    dispatch({
      type: types.GET_PROFILE,
      payload: res.data
    });
  } 
  catch (err) {
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
      payload: { 
        msg: err.response.data.msg, 
        status: err.response.status 
      }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    // make put request since we are adding data to existing profile
    const res = await api.put('/profile/experience', formData);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } 
  catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: { 
        msg: err.response.data.msg, 
        status: err.response.status 
      }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    // make put request since we are adding data to existing profile
    const res = await api.put('/profile/education', formData);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } 
  catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: { 
        msg: err.response.data.msg, 
        status: err.response.status 
      }
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async dispatch => {
  try {
    // make delete request to api
    const res = await api.delete(`/profile/education/${id}`);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Deleted', 'success'));
  } 
  catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: { 
        msg: err.response.data.msg, 
        status: err.response.status 
      }
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async dispatch => {
  try {
    // make delete request to api
    const res = await api.delete(`/profile/experience/${id}`);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Deleted', 'success'));
  } 
  catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: types.PROFILE_ERROR,
      payload: { 
        msg: err.response.data.msg, 
        status: err.response.status 
      }
    });
  }
};

// Delete account and associated data
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    try {

      await api.delete('/profile');

      dispatch({ type: types.CLEAR_PROFILE });
      dispatch({ type: types.ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
      
    } catch (err) {
      dispatch({
        type: types.PROFILE_ERROR,
        payload: { 
          msg: err.response.data.msg, 
          status: err.response.status 
        }
      });
    }
  }
};

// Get github repositories
export const getRepositories = (username) => async dispatch => {
  try {
    // call api to get profiles
    const res = await api.get(`/profile/github/${username}`);

    dispatch({
      type: types.GET_REPOS,
      payload: res.data
    });
  } 
  catch (err) {
    dispatch({
        type: types.PROFILE_ERROR,
        payload: { 
            msg: err.response.data.msg, 
            status: err.response.status 
        }
    });
  }
};