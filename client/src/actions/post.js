import * as types from './types';

import api from '../utils/api';
import { setAlert } from './alert';

// Get all posts
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

// Get all posts
export const getPost = (id) => async dispatch => {
    try {
        const res = await api.get(`/posts/${id}`);
    
        dispatch({
          type: types.GET_POST,
          payload: res.data
        });
    } 
    catch (err) {
        dispatch({
            type: types.POST_ERROR,
            payload: { 
                msg: err.response.data.msg, 
                status: err.response.status 
            }
        });
    }
};

// Add a Post
export const addPost = (formData) => async dispatch => {
    try {
        const res = await api.post('/posts', formData);
    
        dispatch({
          type: types.ADD_POST,
          payload: res.data
        });
    
        dispatch(setAlert('Post Created', 'success'));
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

// Delete a post
export const deletePost = (id) => async dispatch => {
    try {
        await api.delete(`/posts/${id}`);
    
        dispatch({
          type: types.DELETE_POST,
          payload: id
        });

        dispatch(setAlert('Post has been removed', 'success'));
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


// Add a like to a post
export const addLike = (postId) => async dispatch => {
    try {
        const res = await api.put(`/posts/like/${postId}`);
    
        dispatch({
          type: types.UPDATE_LIKES,
          payload: { postId, likes: res.data }
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

// Remove a like from a post
export const removeLike = (postId) => async dispatch => {
    try {
        const res = await api.put(`/posts/unlike/${postId}`);
    
        dispatch({
          type: types.UPDATE_LIKES,
          payload: { postId, likes: res.data }
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

// Add a comment to a post
export const addComment = (postId, formData) => async dispatch => {
    try {
        const res = await api.post(`/posts/comment/${postId}`, formData);
    
        dispatch({
          type: types.ADD_COMMENT,
          payload: res.data
        });

        dispatch(setAlert('Added Comment', 'success'));
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

// Delete a comment from a post
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await api.delete(`/posts/comment/${postId}/${commentId}`);
    
        dispatch({
          type: types.REMOVE_COMMENT,
          payload: commentId
        });

        dispatch(setAlert('Removed Comment', 'success'));
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