import React, { Fragment } from 'react';

import Modal from '../../../template/Modal';

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

function ProductCategoriesLinkModal(props) {
    const { product } = props;
    return (
        <Modal
            modalId={props.modalId} 
            title={`Vincular categorias ao produto ${product ? product.name : ''}`}
            body={null}
            footer={
                <ModalFooter 
                    product={product} 
                    handleClick={props.handleClick} />
            }
        />
    );
}
export default ProductCategoriesLinkModal;
