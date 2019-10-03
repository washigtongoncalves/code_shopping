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
                onClick={() => props.handleClick(props.user)}>
                Restaurar
            </button>
        </Fragment>
    );
}

function UserRestoreModal(props) {
    const user = props.user;
    return (
        <Modal
            modalId={props.modalId} 
            title="Restaurar usuário"
            body={`Deseja restaurar o usuário ${user ? user.name : ''}?`}
            footer={
                <ModalFooter 
                    user={user} 
                    handleClick={props.handleClick} />
            }
        />
    );
}
export default UserRestoreModal;
