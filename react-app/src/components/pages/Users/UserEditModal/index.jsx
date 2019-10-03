import React, { Fragment } from 'react';

import Modal from '../../../template/Modal';
import UserForm from '../UserForm';

function ModalFooter(props) {
    return (
        <Fragment>
            <button type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal">
                Fechar
            </button>
            <button type="submit" className="btn btn-primary">
                {props.acao === 'Editar' ? 'Salvar' : 'Cadastrar'}
            </button>
        </Fragment>
    );
}

function UserEditModal(props) {
    const user = props.user;
    const acao = user && user.id ? 'Editar' : 'Novo';
    return (
        <form onSubmit={props.handleSubmit} id={props.formId}>
            <Modal
                modalId={props.modalId} 
                title={`${acao} usuário`}
                body={
                    <UserForm 
                        user={user}
                        formDataChanged={props.formDataChanged} />
                }
                footer={
                    <ModalFooter 
                        user={user} 
                        acao={acao} />
                }
            />
        </form>
    );
}
export default UserEditModal;
