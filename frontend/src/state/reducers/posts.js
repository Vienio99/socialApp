import {GET_POSTS, GET_POST, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAIL} from "../actions/types";

const initialState = {
    posts: [],
    comments: [],
    isLoading: false
};

const reducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload['posts'],
                comments: payload['comments'],
            };
        default:
            return state;
    }
};

export default reducer;