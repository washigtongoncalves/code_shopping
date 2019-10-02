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
                onClick={() => props.handleClick(props.category.id)}>
                Excluir
            </button>
        </Fragment>
    );
}

function CategoryDeleteModal(props) {
    const category = props.category;
    return (
        <Modal
            modalId={props.modalId} 
            title="Exclusão de categoria"
            body={`Deseja excluir a categoria ${category ? category.name : ''}?`}
            footer={
                <ModalFooter 
                    category={category} 
                    handleClick={props.handleClick} />
            }
        />
    );
}
export default CategoryDeleteModal;
