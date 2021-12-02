import {
    EDIT_USER,
    USER_FETCH, USER_FETCH_SUCCESS
} from "../actions/types";

const initialState = {
    user: {},
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case USER_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                user: payload,
                isLoading: false,
            };
        case EDIT_USER:
            return state;
        default:
            return state;
    }
};

export default reducer;