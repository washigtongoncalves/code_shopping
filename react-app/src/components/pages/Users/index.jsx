import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';

import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';
import UserDeleteModal from './UserDeleteModal';
import UserEditModal from './UserEditModal';
import UserRestoreModal from './UserRestoreModal';

import UsersService from '../../../services/UsersService';
import NotifyMessageService from '../../../services/NotifyMessageService';

import { dateFormatBr } from '../../../functions/formater';
import * as usersActions from '../../../actions/users';

const INITIAL_STATE = {
    userToDelete: null,
    userToEdit: null,
    userToRestore: null
};
const DELETE_MODAL_ID  = 'user-delete-modal';
const EDIT_MODAL_ID    = 'user-edit-modal';
const RESTORE_MODAL_ID = 'user-restore-modal';
const FORM_EDIT_ID     = 'user-edit-form';
class Users extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.modalDelete = this.modalEdit = this.modalRestore = this.formEdit = null;
        this.notify = new NotifyMessageService();
    }

    componentWillMount = () => {
        this.props.getUsers({ 
            page: 1, 
            sort:   this.props.sort, 
            search: this.props.search,
            onlyTrashed: this.props.onlyTrashed 
        });
    }

    componentDidMount = () => {
        this.modalDelete  = $(`#${DELETE_MODAL_ID}`);
        this.modalEdit    = $(`#${EDIT_MODAL_ID}`);
        this.modalRestore = $(`#${RESTORE_MODAL_ID}`);
        this.formEdit     = $(`#${FORM_EDIT_ID}`);
    }

    sortChange = (sort) => {
        this.props.sortChange(sort);
        this.props.getUsers({ 
            page: 1, 
            sort, 
            search: this.props.search,
            onlyTrashed: this.props.onlyTrashed 
        });
    }

    navigate = (page = 1) => {
        this.props.getUsers({ 
            page, 
            sort:   this.props.sort, 
            search: this.props.search,
            onlyTrashed: this.props.onlyTrashed 
        });
    }

    handleChange = (e) => {
        this.props.changeSearchTerm(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getUsers({ 
            page:   1, 
            sort:   this.props.sort, 
            search: this.props.search,
            onlyTrashed: this.props.onlyTrashed 
        });
    }

    changeOnlyTrashed = () => {
        const onlyTrashed  = !this.props.onlyTrashed;
        this.props.changeOnlyTrashed(onlyTrashed);
        this.props.getUsers({ 
            page:   1, 
            sort:   this.props.sort, 
            search: this.props.search,
            onlyTrashed 
        });
    }

    deleteUser = async (user) => {
        await UsersService.delete(user.id);
        this.modalDelete.modal('hide');
        this.setState(
            state => state.userToDelete = null,
            () => {
                this.props.getUsers({ 
                    page:   1, 
                    sort:   this.props.sort, 
                    search: this.props.search,
                    onlyTrashed: this.props.onlyTrashed 
                });
                this.notify.success(`Usuário ${user.name} excluído com sucesso.`);
            }
        );
    }

    showModalDelete = (user) => {
        this.setState(
            state => state.userToDelete = user,
            () => this.modalDelete.modal('show')
        );
    }

    showModalRestore = (user) => {
        this.setState(
            state => state.userToRestore = user,
            () => this.modalRestore.modal('show') 
        );
    }

    showModalEdit = (user = {}) => {
        this.setState(
            state => state.userToEdit = user,
            () => this.modalEdit.modal('show')
        );
    }

    restoreUser = async (user) => {
        await UsersService.restore(user.id);
        this.modalRestore.modal('hide');
        this.setState(
            state => state.userToRestore = null,
            () => {
                this.props.getUsers({ 
                    page:   1, 
                    sort:   this.props.sort, 
                    search: this.props.search,
                    onlyTrashed: this.props.onlyTrashed 
                });
                this.notify.success(`Usuário ${user.name} restaurado com sucesso.`);
            }
        );
    }

    saveUser = (e) => {
        e.preventDefault();
        const user = this.getFormData();
        UsersService.save(user)
        .then(resp => {
            this.modalEdit.modal('hide');
            this.setState(
                state => state.userToEdit = null,
                () => {
                    this.props.getUsers({ 
                        page:   1, 
                        sort:   this.props.sort, 
                        search: this.props.search,
                        onlyTrashed: this.props.onlyTrashed 
                    });
                    this.notify.success(`Usuário ${user.name} salvo com sucesso.`);
                }
            );
        }, error => {
            this.notify.error(`Ocorreu um erro ao tentar salvar o usuário ${user.name}.`);
        });
    }
    
    getFormData = () => {
        const formData = this.formEdit.serializeArray();
        const user = {};
        formData.forEach(field => user[field.name] = field.value);
        if (!user.id) {
            delete user.id;
        }
        return user;
    }

    handleFormDataChanged = () => {
        const user = this.getFormData();
        this.setState(state => state.userToEdit = user);
    }

    renderRows = () => {

        if (!this.props.users.length) {
            return (
                <tr key={0}>
                    <td colSpan="5">
                        Nada a exibir por enquanto :(
                    </td>
                </tr>
            );
        }

        return this.props.users.map(user => (
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
                    {this.props.onlyTrashed ? (
                        <button type="button" className="btn btn-sm btn-primary btn-actions"
                            title="Restaurar usuário"
                            onClick={() => this.showModalRestore(user)}>
                            <i className="fa fa-thumbs-up"></i>
                        </button>
                    ) : (
                        <span>
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
                        </span>
                    )}
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
                                    <input 
                                        type="checkbox" 
                                        name="active"
                                        checked={this.props.onlyTrashed} 
                                        onChange={this.changeOnlyTrashed} 
                                    />
                                    &nbsp;Somente excluídos?
                                </label>
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
                            <th style={{ width: "30%" }}>
                                <SortColumn 
                                    column="name" 
                                    sortChange={this.sortChange}
                                    showIcon={this.props.sort.column === "name"}>
                                    Nome
                                </SortColumn>
                            </th>
                            <th style={{ width: "25%" }}>
                                <SortColumn 
                                    column="email" 
                                    sortChange={this.sortChange}
                                    showIcon={this.props.sort.column === "email"}>
                                    E-mail
                                </SortColumn>
                            </th>
                            <th style={{ width: "25%" }}>
                                <SortColumn 
                                    column="created_at"
                                    showIcon={this.props.sort.column === "created_at"} 
                                    sortChange={this.sortChange}>
                                    Criado em
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
                <UserDeleteModal 
                    modalId={DELETE_MODAL_ID}
                    user={this.state.userToDelete}
                    handleClick={this.deleteUser} />
                <UserEditModal 
                    modalId={EDIT_MODAL_ID}
                    formId={FORM_EDIT_ID}
                    user={this.state.userToEdit}
                    formDataChanged={this.handleFormDataChanged}
                    handleSubmit={this.saveUser} />
                <UserRestoreModal 
                    modalId={RESTORE_MODAL_ID}
                    user={this.state.userToRestore}
                    handleClick={this.restoreUser} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(usersActions, dispatch);
const mapStateToProps = state => state.users;
export default connect(mapStateToProps, mapDispatchToProps)(Users);
