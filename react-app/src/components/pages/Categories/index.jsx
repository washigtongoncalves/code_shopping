import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';
import CategoryDeleteModal from './CategoryDeleteModal';
import CategoryEditModal from './CategoryEditModal';

import CategoriesService from '../../../services/CategoriesService';
import NotifyMessageService from '../../../services/NotifyMessageService';

import { dateFormatBr } from '../../../functions/formater';
import * as categoriesActions from '../../../actions/categories';

const INITIAL_STATE = {
    categoryToDelete: null,
    categoryToEdit: null
};
const DELETE_MODAL_ID = 'category-delete-modal';
const EDIT_MODAL_ID   = 'category-edit-modal';
const FORM_EDIT_ID    = 'category-edit-form';
class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.modalDelete = this.modalEdit = this.formEdit = null;
        this.notify = new NotifyMessageService();
    }

    componentWillMount = () => {
        this.props.getCategories({ 
            page: 1, 
            sort:   this.props.sort, 
            search: this.props.search 
        });
    }

    componentDidMount = () => {
        this.modalDelete = $(`#${DELETE_MODAL_ID}`);
        this.modalEdit   = $(`#${EDIT_MODAL_ID}`);
        this.formEdit    = $(`#${FORM_EDIT_ID}`);
    }

    sortChange = (sort) => {
        this.props.sortChange(sort);
        this.props.getCategories({ 
            page: 1, 
            sort, 
            search: this.props.search 
        });
    }

    navigate = (page) => {
        this.props.getCategories({ 
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
        this.props.getCategories({ 
            page: 1, 
            sort:   this.props.sort, 
            search: this.props.search
        });
    }

    deleteCategory = async (category) => {
        await CategoriesService.delete(category.id);
        this.modalDelete.modal('hide');
        this.setState(state => state.categoryToDelete = null);
        this.props.getCategories({ 
            page: 1, 
            sort:   this.props.sort, 
            search: this.props.search
        });
        this.notify.success(`Categoria ${category.name} excluída com sucesso.`);
    }

    showModalDelete = (category) => {
        this.setState(state => state.categoryToDelete = category);
        this.modalDelete.modal('show');
    }

    showModalEdit = (category = {}) => {
        this.setState(state => state.categoryToEdit = category);
        this.modalEdit.modal('show');
    }

    saveCategory = (e) => {
        e.preventDefault();
        const category = this.getFormData();
        CategoriesService.save(category)
        .then(resp => {
            this.modalEdit.modal('hide');
            this.setState(state => state.categoryToEdit = null);
            this.props.getCategories({ 
                page: 1, 
                sort:   this.props.sort, 
                search: this.props.search
            });
            this.notify.success(`Categoria ${category.name} salva com sucesso.`);
        }, error => {
            this.notify.error(`Ocorreu um erro ao tentar salvar a categoria ${category.name}.`);
        });
    }

    getFormData = () => {
        const formData = this.formEdit.serializeArray();
        const category = {};
        formData.forEach(field => category[field.name] = field.value);
        if (category.active && category.active === 'on') category.active = 1 
        else category.active = 0;
        if (!category.id) {
            delete category.id;
        }
        return category;
    }

    handleFormDataChanged = () => {
        const category = this.getFormData();
        this.setState(state => state.categoryToEdit = category);
    }

    renderRows = () => {

        if (!this.props.categories.length) {
            return (
                <tr key={0}>
                    <td colSpan="5">
                        Nada a exibir por enquanto :(
                    </td>
                </tr>
            );
        }

        return this.props.categories.map(category => (
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
                       title={`Editar a categoria ${category.name}`}
                       onClick={() => this.showModalEdit(category)}>
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

    render = () => {
        return (
            <div className="row" id="no-more-tables">
                <h3>Listagem de Categorias</h3>
                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <td colSpan="3">
                                <button className="btn btn-primary" 
                                    onClick={() => this.showModalEdit()}>
                                    Nova categoria
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
                            <th style={{ width: "50%" }}>
                                <SortColumn 
                                    column="name" 
                                    sortChange={this.sortChange}
                                    showIcon={this.props.sort.column === "name"}>
                                    Nome
                                </SortColumn>
                            </th>
                            <th style={{ width: "15%" }}>Ativa?</th>
                            <th style={{ width: "15%" }}>
                                <SortColumn 
                                    column="created_at"
                                    showIcon={this.props.sort.column === "created_at"} 
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
                        {...this.props.pagination} 
                        navigate={this.navigate} />
                </div>
                <CategoryDeleteModal 
                    modalId={DELETE_MODAL_ID}
                    category={this.state.categoryToDelete}
                    handleClick={this.deleteCategory} />
                <CategoryEditModal 
                    modalId={EDIT_MODAL_ID}
                    formId={FORM_EDIT_ID}
                    category={this.state.categoryToEdit}
                    formDataChanged={this.handleFormDataChanged}
                    handleSubmit={this.saveCategory} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(categoriesActions, dispatch);
const mapStateToProps = state => state.categories;
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
