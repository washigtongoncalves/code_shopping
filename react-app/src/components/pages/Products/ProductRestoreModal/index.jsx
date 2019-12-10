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
                className="btn btn-success" 
                onClick={() => props.handleClick(props.product)}>
                Restaurar
            </button>
        </Fragment>
    );
}

function ProductRestoreModal(props) {
    const product = props.product;
    return (
        <Modal
            modalId={props.modalId} 
            title="Restaurar produto"
            body={`Deseja restaurar o produto ${product ? product.name : ''}?`}
            footer={
                <ModalFooter 
                    product={product} 
                    handleClick={props.handleClick} />
            }
        />
    );
}
export default ProductRestoreModal;
