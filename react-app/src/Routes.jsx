import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Login from './components/pages/Users/Login';
import Categories from './components/pages/Categories';
import Products from './components/pages/Products';
import ProductsCategories from './components/pages/ProductsCategories';
import ProductsInputs from './components/pages/ProductsInputs';
import ProductsOutputs from './components/pages/ProductsOutputs';
import ProductsPhotos from './components/pages/ProductsPhotos';
import Users from './components/pages/Users';

function Routes(props) {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Categories} />
            <Route path="/categories/list" component={Categories} />
            <Route path="/products/list" component={Products} />
            <Route path="/products/:id/categories/list" component={ProductsCategories} />
            <Route path="/products/:id/photos/list" component={ProductsPhotos} />
            <Route path="/inputs/list" component={ProductsInputs} />
            <Route path="/outputs/list" component={ProductsOutputs} />
            <Route path="/users/list" component={Users} />
            <Redirect from="*" to="/" /> 
        </Switch>
    );
}
export default Routes;
