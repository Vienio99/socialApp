import {
    POSTS_FETCH,
    ADD_POST, POSTS_FETCH_SUCCESS, DELETE_POST, EDIT_POST
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
        case POSTS_FETCH_SUCCESS:
            return {
                ...state,
                posts: payload['posts'],
                comments: payload['comments'],
                isLoading: false,
            };
        case ADD_POST:
        case DELETE_POST:
        case EDIT_POST:
            return state;
        default:
            return state;
    }
};

export default reducer;