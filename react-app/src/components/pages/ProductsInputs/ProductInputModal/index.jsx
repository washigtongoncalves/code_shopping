import React, { Fragment, Component } from 'react';

import Modal from '../../../template/Modal';
import ProductInputForm from '../ProductInputForm';

function ModalFooter(props) {
    return (
        <Fragment>
            <button type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal">
                Fechar
            </button>
            <button type="submit" className="btn btn-primary">
                Registrar Entrada
            </button>
        </Fragment>
    );
}

class ProductInputModal extends Component {

    constructor(props) {
        super(props);
        this.productInput = React.createRef();
        this.amountInput  = React.createRef();
    }

    handleSubmit = (e) => {
        const data = {
            product_id: this.productInput.current.value,
            amount : this.amountInput.current.value
        };
        this.props.saveNewProductInput(data);
        e.preventDefault();
    }

    render() {
        const { modalId } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <Modal
                    modalId={modalId} 
                    title="Registrar entrada de produto"
                    body={
                        <ProductInputForm
                            productInput={this.productInput}
                            amountInput={this.amountInput} />
                    }
                    footer={
                        <ModalFooter />
                    }
                />
            </form>
        );
    }
}
export default ProductInputModal;
