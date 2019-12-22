import React, { Component, Fragment } from 'react';

import Modal from '../../../template/Modal';
import CategoriesCombobox from './CategoriesCombobox';

function ModalFooter(props) {
    const { product } = props;
    return (
        <Fragment>
            <button type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal">
                Fechar
            </button>
            <button type="button" 
                className="btn btn-primary" 
                onClick={() => props.handleClick(product)}>
                Vincular
            </button>
        </Fragment>
    );
}

const INITIAL_STATE = {
    selectedCategories: []
};
class ProductCategoriesLinkModal extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    syncState = (s) => {
        this.setState(state => state.selectedCategories = s.selectedCategories);
    }

    handleClick = () => {
        this.props.handleClick(this.state.selectedCategories);
    }

    render() {
        const { product, categories } = this.props;
        return (
            <Modal
                modalId={this.props.modalId} 
                title={`Vincular categorias ao produto ${product ? product.name : ''}`}
                body={
                    <CategoriesCombobox 
                        selectedCategories={categories}
                        syncState={this.syncState} />
                }
                footer={
                    <ModalFooter 
                        product={product} 
                        handleClick={this.handleClick} />
                }
            />
        );
    }    
}
export default ProductCategoriesLinkModal;
