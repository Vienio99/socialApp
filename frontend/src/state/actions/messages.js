import { CREATE_MESSAGE, GET_ERRORS } from './types';

// CREATE MESSAGE
export const createMessage = (message, status) => {
  return {
    type: CREATE_MESSAGE,
    payload: { message, status},
  };
};

// RETURN ERRORS
export const returnErrors = (message, status) => {
  return {
    type: GET_ERRORS,
    payload: { message, status },
  };
};