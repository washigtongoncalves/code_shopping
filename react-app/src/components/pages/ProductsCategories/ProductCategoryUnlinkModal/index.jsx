import React, { Fragment } from 'react';

import Modal from '../../../template/Modal';

function ModalFooter(props) {
    const { product, category } = props;
    return (
        <Fragment>
            <button type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal">
                Fechar
            </button>
            <button type="button" 
                className="btn btn-danger" 
                onClick={() => props.handleClick(product, category)}>
                Desvincular
            </button>
        </Fragment>
    );
}

function ProductCategoryUnlinkModal(props) {
    const { product, category } = props;
    return (
        <Modal
            modalId={props.modalId} 
            title="Desvincular categoria"
            body={`Deseja desvincular a categoria ${category ? category.name : ''} do produto ${product ? product.name : ''}?`}
            footer={
                <ModalFooter 
                    product={product}
                    category={category} 
                    handleClick={props.handleClick} />
            }
        />
    );
}
export default ProductCategoryUnlinkModal;
