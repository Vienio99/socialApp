const initialState = {
    accessToken: null,
    refreshToken: null,
    error: null,
    isLoading: false,
    isAuthenticated: null,
    user: null
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "register":
            return state;
        case "login":
            return state;
        case "logout":
            return state;
        default:
            return state;
    }
};

export default reducer;