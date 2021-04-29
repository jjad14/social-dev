import { v4 as uuidv4 } from 'uuid';
import * as types from './types';

export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();

    dispatch({
        type: types.SET_ALERT,
        payload: { msg, alertType, id}
    });

};