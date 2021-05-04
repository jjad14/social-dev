import * as types from './types';
import api from '../utils/api';

export const getPosts = () => async dispatch => {
    try {
        const res = await api.get('/posts');
    
        dispatch({
          type: types.GET_POSTS,
          payload: res.data
        });
    } 
    catch (err) {
        dispatch({
            type: types.POST_ERROR,
            payload: { 
                msg: err.response.statusText, 
                status: err.response.status 
            }
        });
    }
};