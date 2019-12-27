import React, { Component } from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import ProductsPhotosService from '../../../services/ProductsPhotosService';

const INITIAL_STATE = {
    blocking: true,
    productId: null,
    product: [],
    photos: []
};
class ProductsPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.state.productId = props.match.params.id;
    }

    componentWillMount() {
        this.getPhotos();
    }

    getPhotos = () => {
        this.setState(
            state => state.blocking = true,
            async () => {
                const { data } = await ProductsPhotosService.getPhotos(this.state.productId);
                const { product, photos } = data.data;
                this.setState(state => {
                    state.product  = product;
                    state.photos   = photos;
                    state.blocking = false;
                    return state;
                });
            } 
        );
    }

    render() {
        const { product } = this.state;
        return (
            <BlockUi tag="div" blocking={this.state.blocking} className="row" id="no-more-tables">
                <h3>Gerenciar fotos do produto {product.name}</h3>
            </BlockUi>
        );
    }
}
export default ProductsPhotos;
