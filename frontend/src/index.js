import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {Provider} from "react-redux";
import {store} from "./state/store";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

ReactDOM.render(
    <React.StrictMode>
        <AlertProvider template={AlertTemplate} {...options}>
            <Provider store={store}>
                <App/>
            </Provider>
        </AlertProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

