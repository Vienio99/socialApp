export const login = (username, password) => {
    return (dispatch) => {
        dispatch({
            type: 'login',
            payload: {
                username: username,
                password:password
            }
        });
    };
};