import React, { Fragment } from 'react';

import Modal from '../../../template/Modal';

function ModalFooter(props) {
    return (
        <Fragment>
            <button type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal">
                Fechar
            </button>
            <button type="button" 
                className="btn btn-danger" 
                onClick={() => props.handleClick(props.product)}>
                Excluir
            </button>
        </Fragment>
    );
}

function ProductDeleteModal(props) {
    const product = props.product;
    return (
        <Modal
            modalId={props.modalId} 
            title="Exclusão de produto"
            body={`Deseja excluir o produto ${product ? product.name : ''}?`}
            footer={
                <ModalFooter 
                    product={product} 
                    handleClick={props.handleClick} />
            }
        />
    );
}
export default ProductDeleteModal;
