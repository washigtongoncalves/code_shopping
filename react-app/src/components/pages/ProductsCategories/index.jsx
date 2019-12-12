import React, { Component } from 'react';

import NotifyMessageService from '../../../services/NotifyMessageService';
import ProductsCategoriesServices from '../../../services/ProductsCategoriesServices';

const INITIAL_STATE = {
    product: [],
    categories: []
};

class ProductsCategories extends Component {

    constructor(props) {
        super(props);
        this.state  = INITIAL_STATE;
        this.notify = new NotifyMessageService();
        this.productId = props.match.params.id;
    }

    componentWillMount() {
        this.getCategories();
    }

    getCategories = async () => {
        const { data } = await ProductsCategoriesServices.getCategories(this.productId);
        const { product, categories } = data.data;
        this.setState(state => {
            state.product = product;
            state.categories = categories;
            return state;
        });
    }

    render() {
        const product = this.state.product;
        return (
            <div className="row" id="no-more-tables">
                <h3>Categorias do produto {product.name}</h3>
            </div>
        );
    }
}
export default ProductsCategories;
