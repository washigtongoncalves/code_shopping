import React, { Fragment, Component } from 'react';

import Modal from '../../../template/Modal';
import ProductInputOutputForm from '../../ProductInputOutputForm';

function ModalFooter(props) {
    return (
        <Fragment>
            <button type="button" 
                className="btn btn-secondary" 
                data-dismiss="modal">
                Fechar
            </button>
            <button type="submit" className="btn btn-primary">
                Registrar Saída
            </button>
        </Fragment>
    );
}

class ProductOutputModal extends Component {

    constructor(props) {
        super(props);
        this.productOutput = React.createRef();
        this.amountOutput  = React.createRef();
    }

    handleSubmit = (e) => {
        const data = {
            product_id: this.productOutput.current.value,
            amount : this.amountOutput.current.value
        };
        this.props.saveNewProductOutput(data);
        e.preventDefault();
    }

    render() {
        const { modalId } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <Modal
                    modalId={modalId} 
                    title="Registrar saída de produto"
                    body={
                        <ProductInputOutputForm
                            product={this.productOutput}
                            amount={this.amountOutput} />
                    }
                    footer={
                        <ModalFooter />
                    }
                />
            </form>
        );
    }
}
export default ProductOutputModal;
