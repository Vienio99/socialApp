import { createStore } from "redux";
import reducers from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

export const store = createStore(
    reducers,
    initialState,
    composeWithDevTools()
);