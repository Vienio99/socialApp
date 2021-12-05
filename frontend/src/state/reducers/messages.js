import {CLEAR_MESSAGE, CREATE_MESSAGE} from '../actions/types';

const initialState = {
    message: {},
    status: null,
};

export default function (state = initialState, action) {
    const {payload} = action;
    switch (action.type) {
        case CREATE_MESSAGE:
            console.log(payload.message);
            return {
                message: payload.message,
                status: payload.status,
            };
        case CLEAR_MESSAGE:
            return {
                message: {},
                status: null,
            };
        default:
            return state;
    }
}
