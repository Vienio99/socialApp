const initialState = {
    token: null,
    error: null,
    loading: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "register":
            return state + action.payload;
        case "login":
            return state + action.payload;
        case "logout":
            return state + action.payload;
        default:
            return state;
    }
};

export default reducer;