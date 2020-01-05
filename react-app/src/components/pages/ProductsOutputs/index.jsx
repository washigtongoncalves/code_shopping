import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';

import ProductsOutputsService from '../../../services/ProductsOutputsService';
import NotifyMessageService from '../../../services/NotifyMessageService';
import ProductOutputModal from './ProductOutputModal';

import { dateFormatBr } from '../../../functions/formater';
import * as productsOutputsActions from '../../../actions/productsOutputs';

const NEW_OUTPUT_MODAL_ID = 'new-product-output-modal';
class ProductsOutputs extends Component {

    constructor(props) {
        super(props);
        this.modalOutput = null;
        this.notify = new NotifyMessageService();
    }

    componentWillMount = () => {
        this.props.getOutputs({ 
            page: 1, 
            sort:   this.props.sort, 
            search: this.props.search 
        });
    }

    componentDidMount = () => {
        this.modalOutput = $(`#${NEW_OUTPUT_MODAL_ID}`);
    }

    sortChange = (sort) => {
        this.props.sortChange(sort);
        this.props.getOutputs({ 
            page: 1, 
            sort, 
            search: this.props.search 
        });
    }

    navigate = (page) => {
        this.props.getOutputs({ 
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
        this.props.getOutputs({ 
            page: 1, 
            sort:   this.props.sort,
            search: this.props.search
        });
    }

    showModalNewProductOutput = () => {
        this.modalOutput.modal('show');
    }

    saveNewProductOutput = data => {
        ProductsOutputsService.store(data.product_id, data)
        .then(resp => {
            this.modalOutput.modal('hide');
            this.props.getOutputs({ 
                page: 1, 
                sort:   this.props.sort,
                search: this.props.search
            });
            this.notify.success('Saída de produto registrada com sucesso.');
        }, error => {
            this.notify.error('Ocorreu um erro ao tentar registrar a saída do produto.');
        });
    }
    
    renderRows = () => {

        if (!this.props.outputs.length) {
            return (
                <tr key={0}>
                    <td colSpan="4">
                        Nada a exibir por enquanto :(
                    </td>
                </tr>
            );
        }

        return this.props.outputs.map(output => (
            <tr key={output.id}>
                <td data-title="ID:">
                    {output.id}
                </td>
                <td data-title="Produto:">
                    {output.product.name}
                </td>
                <td data-title="Quantidade:">
                    {output.amount}
                </td>
                <td data-title="Criada em:">
                    {dateFormatBr(output.created_at.date)}
                </td>
            </tr>
        ));
    }

    render = () => {
        return (
            <div className="row" id="no-more-tables">
                <h3>Listagem de Saídas de Estoque</h3>
                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <td colSpan="2">
                                <button className="btn btn-primary" 
                                    onClick={() => this.showModalNewProductOutput()}>
                                    Registrar Saída
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
                <ProductOutputModal 
                    modalId={NEW_OUTPUT_MODAL_ID}
                    saveNewProductOutput={this.saveNewProductOutput} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(productsOutputsActions, dispatch);
const mapStateToProps = state => state.outputs;
export default connect(mapStateToProps, mapDispatchToProps)(ProductsOutputs);
