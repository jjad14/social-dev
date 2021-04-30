import * as types from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
              };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload, // payload is {token: ""}
                isAuthenticated: true,
                loading: false
              };
        case types.REGISTER_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload, // payload is {token: ""}
                isAuthenticated: true,
                loading: false
              };
        case types.LOGIN_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case types.AUTH_ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
              };
        case types.LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
              };
        case types.ACCOUNT_DELETED:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
              };
        default:
            return state;
    }
};

export default reducer;