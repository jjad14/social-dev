import * as types from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case types.PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                profile: null
            };
        default:
            return state;
    }
};

export default reducer;