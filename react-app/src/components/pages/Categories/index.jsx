import React, { Component } from 'react';

import CategoriesService from '../../../services/CategoriesService';
import { dateFormatBr } from '../../../functions/formater';
import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            sort: { column: null },
            search: '',
            pagination: {}
        };
        this.sortChange = this.sortChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentWillMount() {
        this.getCategories();
    }

    async getCategories(paramns = {}) {
        const { data } = await CategoriesService.list(paramns);
        const categories = data.data;
        const pagination = data.meta;
        this.setState(state => { 
            state.categories = categories;
            state.pagination = pagination;
            return state;
        });
    }

    sortChange(sort) {
        this.setState(state => state.sort = sort);
        this.getCategories({ page: 1, sort});
    }

    navigate(nextPage) {
        this.getCategories({ page: nextPage });
    }

    handleChange(e) {
        const search = e.target.value;
        this.setState(state => state.search = search);
    }

    handleSubmit(e) {
        e.preventDefault();
        const search = this.state.search;
        this.getCategories({ page: 1, search});
    }

    renderRows() {

        if (!this.state.categories.length) {
            return (
                <tr>
                    <td colSpan="5">
                        Nada a exibir por enquanto :(
                    </td>
                </tr>
            );
        }

        return this.state.categories.map(category => (
            <tr key={category.id}>
                <td data-title="ID:">
                    {category.id}
                </td>
                <td data-title="Nome:">
                    {category.name}
                </td>
                <td data-title="Ativa:">
                    <i className={`fa fa-${category.active ? 'check' : 'times'}`}></i>
                </td>
                <td data-title="Criada em:">
                    {dateFormatBr(category.created_at.date)}
                </td>
                <td data-title="Ações: ">
                    
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div className="row" id="no-more-tables">
                <h3>Listagem de Categorias</h3>
                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <td colSpan="3">
                                <button className="btn btn-primary">
                                    Nova categoria
                                </button>
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
                            <th style={{ width: "50%" }}>
                                <SortColumn 
                                    column="name" 
                                    sortChange={this.sortChange}
                                    showIcon={this.state.sort.column === "name"}>
                                    Nome
                                </SortColumn>
                            </th>
                            <th style={{ width: "15%" }}>Ativa?</th>
                            <th style={{ width: "15%" }}>
                                <SortColumn 
                                    column="created_at"
                                    showIcon={this.state.sort.column === "created_at"} 
                                    sortChange={this.sortChange}>
                                    Criada em
                                </SortColumn>
                            </th>
                            <th style={{ width: "15%" }}>Ações</th>
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
export default Categories;
