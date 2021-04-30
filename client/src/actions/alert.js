import { v4 as uuidv4 } from 'uuid';
import * as types from './types';

export const setAlert = (msg, alertType, time = 3000) => dispatch => {
    const id = uuidv4();

    dispatch({
        type: types.SET_ALERT,
        payload: { msg, alertType, id}
    });

    setTimeout(() => {
        dispatch({ type: types.REMOVE_ALERT, payload: id});
    }, time);
};