import * as types from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case types.POST_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;