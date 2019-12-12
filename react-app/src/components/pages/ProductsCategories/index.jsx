import React, { Component } from 'react';

import NotifyMessageService from '../../../services/NotifyMessageService';

class ProductsCategories extends Component {

    constructor(props) {
        super(props);
        this.notify = new NotifyMessageService();
        this.productId = props.match.params.id;
    }

    render() {
        return (
            <div className="row" id="no-more-tables">
                <h3>Categorias do produto {this.productId}</h3>
            </div>
        );
    }
}
export default ProductsCategories;
