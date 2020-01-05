import { combineReducers } from 'redux';

import categories from './categories';
import inputs from './productsInputs';

export default combineReducers({
    categories,
    inputs
});