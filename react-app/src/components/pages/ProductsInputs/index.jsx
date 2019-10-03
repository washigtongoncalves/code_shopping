import React, { Component } from 'react';

import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';
import { dateFormatBr } from '../../../functions/formater';

import ProductsInputsService from '../../../services/ProductsInputsService';
import NotifyMessageService from '../../../services/NotifyMessageService';

const INITIAL_SATE = {
    inputs: [],
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};

class ProductsInputs extends Component {

    constructor(props) {
        super(props);
        this.state  = INITIAL_SATE;
        this.notify = new NotifyMessageService();
    }

    componentWillMount = () => {
        this.getInputs();
    }

    getInputs = async (paramns = {}) => {
        const { data } = await ProductsInputsService.list(paramns);
        const inputs = data.data;
        const pagination = data.meta;
        this.setState(state => { 
            state.inputs = inputs;
            state.pagination = pagination;
            return state;
        });
    }

    sortChange = (sort) => {
        this.setState(state => state.sort = sort);
        this.getInputs({ page: 1, sort, search: this.state.search });
    }

    navigate = (page) => {
        this.getInputs({ page });
    }

    handleChange = (e) => {
        const search = e.target.value;
        this.setState(state => state.search = search);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const search = this.state.search;
        this.getInputs({ page: 1, search});
    }
    
    renderRows = () => {

        if (!this.state.inputs.length) {
            return (
                <tr key={0}>
                    <td colSpan="4">
                        Nada a exibir por enquanto :(
                    </td>
                </tr>
            );
        }

        return this.state.inputs.map(input => (
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
                                &nbsp;
                            </td>
                            <td colSpan="2">
                                <SearchForm 
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: "5%" }}>
                                <SortColumn 
                                    column="id"
                                    showIcon={this.state.sort.column === "id"} 
                                    sortChange={this.sortChange}>
                                    ID
                                </SortColumn>
                            </th>
                            <th style={{ width: "40%" }}>
                                <SortColumn 
                                    column="product_name" 
                                    sortChange={this.sortChange}
                                    showIcon={this.state.sort.column === "product_name"}>
                                    Produto
                                </SortColumn>
                            </th>
                            <th style={{ width: "30%" }}>
                                <SortColumn 
                                    column="amount" 
                                    sortChange={this.sortChange}
                                    showIcon={this.state.sort.column === "amount"}>
                                    Quantidade
                                </SortColumn>
                            </th>
                            <th style={{ width: "25%" }}>
                                <SortColumn 
                                    column="created_at"
                                    showIcon={this.state.sort.column === "created_at"} 
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
                        {...this.state.pagination} 
                        navigate={this.navigate} />
                </div>
            </div>
        );
    }
}
export default ProductsInputs;
