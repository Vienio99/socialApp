import {applyMiddleware, createStore} from "redux";
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
);