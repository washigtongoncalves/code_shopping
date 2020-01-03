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
                onClick={() => props.handleClick(props.photo)}>
                Excluir
            </button>
        </Fragment>
    );
}

function PhotoDeleteModal(props) {
    const photo = props.photo;
    return (
        <Modal
            modalId={props.modalId} 
            title="Exclusão de foto de produto"
            body={`Deseja excluir a foto #${photo}?`}
            footer={
                <ModalFooter 
                    photo={photo} 
                    handleClick={props.handleClick} />
            }
        />
    );
}
export default PhotoDeleteModal;
