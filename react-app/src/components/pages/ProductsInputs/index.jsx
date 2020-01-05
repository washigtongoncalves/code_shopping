import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';

import ProductsInputsService from '../../../services/ProductsInputsService';
import NotifyMessageService from '../../../services/NotifyMessageService';
import ProductInputModal from './ProductInputModal';

import { dateFormatBr } from '../../../functions/formater';
import * as productsInputsActions from '../../../actions/productsInputs';

const NEW_INPUT_MODAL_ID = 'new-product-input-modal';
class ProductsInputs extends Component {

    constructor(props) {
        super(props);
        this.modalInput = null;
        this.notify = new NotifyMessageService();
    }

    componentWillMount = () => {
        this.props.getInputs({ 
            page: 1, 
            sort:   this.props.sort, 
            search: this.props.search 
        });
    }

    componentDidMount = () => {
        this.modalInput = $(`#${NEW_INPUT_MODAL_ID}`);
    }

    sortChange = (sort) => {
        this.props.sortChange(sort);
        this.props.getInputs({ 
            page: 1, 
            sort, 
            search: this.props.search 
        });
    }

    navigate = (page) => {
        this.props.getInputs({ 
            page,
            sort:   this.props.sort,
            search: this.props.search 
        });
    }

    handleChange = (e) => {
        this.props.changeSearchTerm(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getInputs({ 
            page: 1, 
            sort:   this.props.sort,
            search: this.props.search
        });
    }

    showModalNewProductInput = () => {
        this.modalInput.modal('show');
    }

    saveNewProductInput = data => {
        ProductsInputsService.store(data.product_id, data)
        .then(resp => {
            this.modalInput.modal('hide');
            this.props.getInputs({ 
                page: 1, 
                sort:   this.props.sort,
                search: this.props.search
            });
            this.notify.success('Entrada de produto registrada com sucesso.');
        }, error => {
            this.notify.error('Ocorreu um erro ao tentar registrar a entrada do produto.');
        });
    }
    
    renderRows = () => {

        if (!this.props.inputs.length) {
            return (
                <tr key={0}>
                    <td colSpan="4">
                        Nada a exibir por enquanto :(
                    </td>
                </tr>
            );
        }

        return this.props.inputs.map(input => (
            <tr key={input.id}>
                <td data-title="ID:">
                    {input.id}
                </td>
                <td data-title="Produto:">
                    {input.product.name}
                </td>
                <td data-title="Quantidade:">
                    {input.amount}
                </td>
                <td data-title="Criada em:">
                    {dateFormatBr(input.created_at.date)}
                </td>
            </tr>
        ));
    }

    render = () => {
        return (
            <div className="row" id="no-more-tables">
                <h3>Listagem de Entradas de Estoque</h3>
                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <td colSpan="2">
                                <button className="btn btn-primary" 
                                    onClick={() => this.showModalNewProductInput()}>
                                    Registrar Entrada
                                </button>
                            </td>
                            <td colSpan="2">
                                <SearchForm
                                    term={this.props.search} 
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: "5%" }}>
                                <SortColumn 
                                    column="id"
                                    showIcon={this.props.sort.column === "id"} 
                                    sortChange={this.sortChange}>
                                    ID
                                </SortColumn>
                            </th>
                            <th style={{ width: "40%" }}>
                                <SortColumn 
                                    column="product_name" 
                                    sortChange={this.sortChange}
                                    showIcon={this.props.sort.column === "product_name"}>
                                    Produto
                                </SortColumn>
                            </th>
                            <th style={{ width: "30%" }}>
                                <SortColumn 
                                    column="amount" 
                                    sortChange={this.sortChange}
                                    showIcon={this.props.sort.column === "amount"}>
                                    Quantidade
                                </SortColumn>
                            </th>
                            <th style={{ width: "25%" }}>
                                <SortColumn 
                                    column="created_at"
                                    showIcon={this.props.sort.column === "created_at"} 
                                    sortChange={this.sortChange}>
                                    Criada em
                                </SortColumn>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
                <div style={{ width: "100%" }}>
                    <PaginationControls
                        {...this.props.pagination} 
                        navigate={this.navigate} />
                </div>
                <ProductInputModal 
                    modalId={NEW_INPUT_MODAL_ID}
                    saveNewProductInput={this.saveNewProductInput} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(productsInputsActions, dispatch);
const mapStateToProps = state => state.inputs;
export default connect(mapStateToProps, mapDispatchToProps)(ProductsInputs);
