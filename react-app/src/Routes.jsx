import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Login from './components/pages/Users/Login';
import Categories from './components/pages/Categories';
import Products from './components/pages/Products';
import ProductsInputs from './components/pages/ProductsInputs';
import ProductsOutputs from './components/pages/ProductsOutputs';
import Users from './components/pages/Users';

function Routes(props) {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/categories" component={Categories} />
            <Route path="/products" component={Products} />
            <Route path="/inputs" component={ProductsInputs} />
            <Route path="/outputs" component={ProductsOutputs} />
            <Route path="/users" component={Users} />
            <Redirect from="*" to="/" /> 
        </Switch>
    );
}
export default Routes;
