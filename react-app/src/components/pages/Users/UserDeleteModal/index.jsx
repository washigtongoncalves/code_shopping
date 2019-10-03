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
                onClick={() => props.handleClick(props.user)}>
                Excluir
            </button>
        </Fragment>
    );
}

function UserDeleteModal(props) {
    const user = props.user;
    return (
        <Modal
            modalId={props.modalId} 
            title="Exclusão de usuário"
            body={`Deseja excluir o usuário ${user ? user.name : ''}?`}
            footer={
                <ModalFooter 
                    user={user} 
                    handleClick={props.handleClick} />
            }
        />
    );
}
export default UserDeleteModal;
