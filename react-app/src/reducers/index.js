import { combineReducers } from 'redux';

import categories from './categories';
import products from './products';
import inputs from './productsInputs';
import outputs from './productsOutputs';
import users from './users';

export default combineReducers({
    categories,
    products,
    inputs,
    outputs,
    users
});
