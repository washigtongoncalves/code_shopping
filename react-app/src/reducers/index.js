import { combineReducers } from 'redux';

import categories from './categories';
import products from './products';
import inputs from './productsInputs';
import outputs from './productsOutputs';

export default combineReducers({
    categories,
    inputs,
    outputs,
    products,
});
