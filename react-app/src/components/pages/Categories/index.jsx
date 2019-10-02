import React, { Component } from 'react';
import $ from 'jquery';

import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';
import CategoryDeleteModal from './CategoryDeleteModal';
import { dateFormatBr } from '../../../functions/formater';

import CategoriesService from '../../../services/CategoriesService';
import NotifyMessageService from '../../../services/NotifyMessageService';

const INITIAL_SATE = {
    categories: [],
    categoryToDelete: null,
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};

class Categories extends Component {

    constructor(props) {
        super(props);
        this.modalDelete = null;
        this.notify = new NotifyMessageService;
        this.state = INITIAL_SATE;
        this.sortChange = this.sortChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.navigate = this.navigate.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentWillMount() {
        this.getCategories();
    }

    componentDidMount() {
        this.modalDelete = $("#category-delete-modal");
    }

    async getCategories(paramns = {}) {
        const { data }   = await CategoriesService.list(paramns);
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
        this.getCategories({ page: 1, sort, search: this.state.search });
    }

    navigate(page) {
        this.getCategories({ page });
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

    async deleteCategory(category) {
        await CategoriesService.delete(category.id);
        this.modalDelete.modal('hide');
        this.setState(state => state.categoryToDelete = null);
        this.getCategories();
        this.notify.success(`Categoria ${category.name} excluída com sucesso.`);
    }

    showModalDelete(category) {
        this.setState(state => state.categoryToDelete = category);
        this.modalDelete.modal('show');
    }

    renderRows() {

        if (!this.state.categories.length) {
            return (
                <tr key={0}>
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
                    <button type="button" className="btn btn-sm btn-success btn-actions" 
                       title={`Editar a categoria ${category.name}`}>
                       <i className="fa fa-edit"></i>
                    </button>
                    <button type="button" className="btn btn-sm btn-danger btn-actions" 
                       title={`Excluir a categoria ${category.name}`}
                       onClick={() => this.showModalDelete(category)}>
                       <i className="fa fa-trash-o"></i>
                    </button>
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
                <CategoryDeleteModal 
                    modalId="category-delete-modal"
                    category={this.state.categoryToDelete}
                    handleClick={this.deleteCategory} />
            </div>
        );
    }
}
export default Categories;
