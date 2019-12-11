import React, { Fragment } from 'react';

import Modal from '../../../template/Modal';
import ProductForm from '../ProductForm';

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

function ProductEditModal(props) {
    const product = props.product;
    const acao = product && product.id ? 'Editar' : 'Novo';
    return (
        <form onSubmit={props.handleSubmit} id={props.formId}>
            <Modal
                modalId={props.modalId} 
                title={`${acao} produto`}
                body={
                    <ProductForm 
                        product={product}
                        formDataChanged={props.formDataChanged} />
                }
                footer={
                    <ModalFooter 
                        product={product} 
                        acao={acao} />
                }
            />
        </form>
    );
}
export default ProductEditModal;
