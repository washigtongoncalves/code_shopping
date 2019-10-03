import React, { Component } from 'react';
import $ from 'jquery';

import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';
// import UserDeleteModal from './UserDeleteModal';
// import UserEditModal from './UserEditModal';
// import UserRestoreModal from './UserRestoreModal';
import { dateFormatBr } from '../../../functions/formater';

import UsersService from '../../../services/UsersService';
import NotifyMessageService from '../../../services/NotifyMessageService';

const INITIAL_SATE = {
    users: [],
    userToDelete: null,
    userToEdit: null,
    userToRestore: null,
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};
const DELETE_MODAL_ID  = 'user-delete-modal';
const EDIT_MODAL_ID    = 'user-edit-modal';
const RESTORE_MODAL_ID = 'user-restore-modal';
const FORM_EDIT_ID     = 'user-edit-form';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_SATE;
        this.modalDelete = this.modalEdit = this.modalRestore = this.formEdit = null;
        this.notify = new NotifyMessageService();
    }

    componentWillMount = () => {
        this.getUsers();
    }

    componentDidMount = () => {
        this.modalDelete  = $(`#${DELETE_MODAL_ID}`);
        this.modalEdit    = $(`#${EDIT_MODAL_ID}`);
        this.modalRestore = $(`#${RESTORE_MODAL_ID}`);
        this.formEdit     = $(`#${FORM_EDIT_ID}`);
    }

    getUsers = async (paramns = {}) => {
        const { data }   = await UsersService.list(paramns);
        const users = data.data;
        const pagination = data.meta;
        this.setState(state => { 
            state.users = users;
            state.pagination = pagination;
            return state;
        });
    }

    sortChange = (sort) => {
        this.setState(state => state.sort = sort);
        this.getUsers({ page: 1, sort, search: this.state.search });
    }

    navigate = (page) => {
        this.getUsers({ page });
    }

    handleChange = (e) => {
        const search = e.target.value;
        this.setState(state => state.search = search);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const search = this.state.search;
        this.getUsers({ page: 1, search});
    }

    // deleteuser = async (user) => {
    //     await CategoriesService.delete(user.id);
    //     this.modalDelete.modal('hide');
    //     this.setState(state => state.userToDelete = null);
    //     this.getUsers();
    //     this.notify.success(`Categoria ${user.name} excluída com sucesso.`);
    // }

    // showModalDelete = (user) => {
    //     this.setState(state => state.userToDelete = user);
    //     this.modalDelete.modal('show');
    // }

    // showModalEdit = (user = {}) => {
    //     this.setState(state => state.userToEdit = user);
    //     this.modalEdit.modal('show');
    // }

    // saveuser = (e) => {
    //     e.preventDefault();
    //     const user = this.getFormData();
    //     CategoriesService.save(user)
    //     .then(resp => {
    //         this.modalEdit.modal('hide');
    //         this.setState(state => state.userToEdit = null);
    //         this.getUsers();
    //         this.notify.success(`Categoria ${user.name} salva com sucesso.`);
    //     }, error => {
    //         this.notify.error(`Ocorreu um erro ao tentar salvar a categoria ${user.name}.`);
    //     });
    // }
    // 
    // getFormData = () => {
    //     const formData = this.formEdit.serializeArray();
    //     const user = {};
    //     formData.forEach(field => user[field.name] = field.value);
    //     if (user.active && user.active === 'on') user.active = 1 
    //     else user.active = 0;
    //     if (!user.id) {
    //         delete user.id;
    //     }
    //     return user;
    // }

    // handleFormDataChanged = () => {
    //     const user = this.getFormData();
    //     this.setState(state => state.userToEdit = user);
    // }

    renderRows = () => {

        if (!this.state.users.length) {
            return (
                <tr key={0}>
                    <td colSpan="5">
                        Nada a exibir por enquanto :(
                    </td>
                </tr>
            );
        }

        return this.state.users.map(user => (
            <tr key={user.id}>
                <td data-title="ID:">
                    {user.id}
                </td>
                <td data-title="Nome:">
                    {user.name}
                </td>
                <td data-title="E-mail:">
                    {user.email}
                </td>
                <td data-title="Criado em:">
                    {dateFormatBr(user.created_at.date)}
                </td>
                <td data-title="Ações: ">
                    <button type="button" className="btn btn-sm btn-success btn-actions" 
                       title={`Editar o usuário ${user.name}`}
                       onClick={() => this.showModalEdit(user)}>
                       <i className="fa fa-edit"></i>
                    </button>
                    <button type="button" className="btn btn-sm btn-danger btn-actions" 
                       title={`Excluir o usuário ${user.name}`}
                       onClick={() => this.showModalDelete(user)}>
                       <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render = () => {
        return (
            <div className="row" id="no-more-tables">
                <h3>Listagem de Usuários</h3>
                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <td colSpan="3">
                                <button className="btn btn-primary" 
                                    onClick={() => this.showModalEdit()}>
                                    Novo usuário
                                </button>
                                &nbsp;
                                <label>
                                    <input type="checkbox" name="active" />
                                    &nbsp;Somente excluídos?
                                </label>
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
                            <th style={{ width: "30%" }}>
                                <SortColumn 
                                    column="name" 
                                    sortChange={this.sortChange}
                                    showIcon={this.state.sort.column === "name"}>
                                    Nome
                                </SortColumn>
                            </th>
                            <th style={{ width: "25%" }}>
                                <SortColumn 
                                    column="email" 
                                    sortChange={this.sortChange}
                                    showIcon={this.state.sort.column === "email"}>
                                    E-mail
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
                {/* <userDeleteModal 
                    modalId={DELETE_MODAL_ID}
                    user={this.state.userToDelete}
                    handleClick={this.deleteuser} />
                <userEditModal 
                    modalId={EDIT_MODAL_ID}
                    formId={FORM_EDIT_ID}
                    user={this.state.userToEdit}
                    formDataChanged={this.handleFormDataChanged}
                    handleSubmit={this.saveuser} /> */}
            </div>
        );
    }
}
export default Users;
