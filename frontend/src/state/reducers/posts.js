import {
    GET_POSTS,
    GET_POST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    POSTS_FETCHED,
    POSTS_FETCH,
    ADD_POST
} from "../actions/types";

const initialState = {
    posts: [],
    comments: [],
    isLoading: false
};

const reducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case POSTS_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case POSTS_FETCHED:
            return {
                ...state,
                posts: payload['posts'],
                comments: payload['comments'],
                isLoading: false,
            };
        default:
            return state;
    }
};

export default reducer;