import {CREATE_ERROR_MESSAGE} from '../actions/types';

const initialState = {
  message: {},
  status: null,
};

export default function (state = initialState, action) {
  const {payload} = action;
  switch (action.type) {
    case CREATE_ERROR_MESSAGE:
      return {
        msg: payload.message,
        status: payload.status,
      };
    default:
      return state;
  }
}