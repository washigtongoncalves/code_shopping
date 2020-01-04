import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise'; // Nas actions, transforma Promises em dados

import reducers from './reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); // Habilitar o uso do Devtools
const store = applyMiddleware(promise)(createStore)(
    reducers,
    devTools
);
export default store;
