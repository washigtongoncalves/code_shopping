import React, { Fragment } from 'react';

import Modal from '../../../template/Modal';
import CategoryForm from '../CategoryForm';

function ModalFooter(props) {
    return (
        <Fragment>
            <button type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal">
                Fechar
            </button>
            <button type="submit" className="btn btn-primary">
                {props.acao === 'Editar' ? 'Salvar' : 'Incluir'}
            </button>
        </Fragment>
    );
}

function CategoryEditModal(props) {
    const category = props.category;
    const acao = category && category.id ? 'Editar' : 'Nova';
    return (
        <form onSubmit={props.handleSubmit} id={props.formId}>
            <Modal
                modalId={props.modalId} 
                title={`${acao} categoria`}
                body={
                    <CategoryForm 
                        category={category}
                        formDataChanged={props.formDataChanged} />
                }
                footer={
                    <ModalFooter 
                        category={category} 
                        acao={acao} />
                }
            />
        </form>
    );
}
export default CategoryEditModal;
