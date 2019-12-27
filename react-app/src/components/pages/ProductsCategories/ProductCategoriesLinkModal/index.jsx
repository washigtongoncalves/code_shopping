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

class ProductCategoriesLinkModal extends Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    handleClick = () => {
        const selectedCategories = [];
        const selected = this.input.current.selectedOptions;
        Array.from(selected).forEach(element => selectedCategories.push(element.value));
        if (selectedCategories.length) {
            this.props.handleClick(selectedCategories);
        }
    }

    render() {
        const { product } = this.props;
        return (
            <Modal
                modalId={this.props.modalId} 
                title={`Vincular categorias ao produto ${product ? product.name : ''}`}
                body={
                    <CategoriesCombobox 
                        input={this.input} />
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
