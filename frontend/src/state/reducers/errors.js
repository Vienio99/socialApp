import {GET_ERRORS} from '../actions/types';

const initialState = {
  message: {},
  status: null,
};

export default function (state = initialState, action) {
  const {payload} = action;
  switch (action.type) {
    case GET_ERRORS:
        console.log(payload);
      return {
        message: payload.message,
        status: payload.status,
      };
    default:
      return state;
  }
}