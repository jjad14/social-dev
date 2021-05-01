import api from '../utils/api';
import * as types from '../actions/types';
import { setAlert } from './alert';

// Get users current profile
export const getCurrentProfile = () => async dispatch => {
    try {
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