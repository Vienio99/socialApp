import {CLEAR_MESSAGE, CREATE_MESSAGE} from '../actions/types';

const initialState = {
    message: ''
};

export default function (state = initialState, action) {
    const {payload} = action;
    switch (action.type) {
        case CREATE_MESSAGE:
            console.log(payload.message);
            return {
                message: payload.message
            };
        case CLEAR_MESSAGE:
            return {
                message: ''
            };
        default:
            return state;
    }
}
