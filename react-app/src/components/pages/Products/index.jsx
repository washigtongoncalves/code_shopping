import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';

import SortColumn from '../../template/SortColumn';
import SearchForm from '../../template/SearchForm';
import PaginationControls from '../../template/PaginationControls';
import NotifyMessageService from '../../../services/NotifyMessageService';
import ProductsService from '../../../services/ProductsService';
import ProductDeleteModal from './ProductDeleteModal';
import ProductRestoreModal from './ProductRestoreModal';
import ProductEditModal from './ProductEditModal';
import { dateFormatBr, numberFormatBr } from '../../../functions/formater';

const INITIAL_STATE = {
    products: [],
    productToDelete: null,
    productToEdit: null,
    productToRestore: null,
    page: 1,
    onlyTrashed: 0,
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};
const DELETE_MODAL_ID  = 'product-delete-modal';
const EDIT_MODAL_ID    = 'product-edit-modal';
const RESTORE_MODAL_ID = 'product-restore-modal';
const FORM_EDIT_ID     = 'product-edit-form';
class Products extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.modalDelete = this.modalEdit = this.modalRestore = this.formEdit = null;
        this.notify = new NotifyMessageService();
    }

    componentWillMount = () => {
        this.getProducts();
    }

    componentDidMount = () => {
        this.modalDelete  = $(`#${DELETE_MODAL_ID}`);
        this.modalEdit    = $(`#${EDIT_MODAL_ID}`);
        this.modalRestore = $(`#${RESTORE_MODAL_ID}`);
        this.formEdit     = $(`#${FORM_EDIT_ID}`);
    }

    getProducts = async () => {
        const params = {
            page: this.state.page,
            sort: this.state.sort,
            search: this.state.search,
            onlyTrashed: this.state.onlyTrashed
        }; 
        const { data } = await ProductsService.list(params);
        const products = data.data;
        const pagination = data.meta;
        this.setState(state => { 
            state.products = products;
            state.pagination = pagination;
            return state;
        });
    }

    sortChange = (sort) => {
        this.setState(state => state.sort = sort);
        this.getProducts();
    }

    navigate = (page = 1) => {
        this.setState(state => state.page = page);
        this.getProducts();
    }

    handleChange = (e) => {
        const search = e.target.value;
        this.setState(state => state.search = search);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(state => state.page = 1);
        this.getProducts();
    }

    changeOnlyTrashed = () => {
        const onlyTrashed = !this.state.onlyTrashed;
        this.setState(state => {
            state.onlyTrashed = onlyTrashed;
            return state;
        }, this.getProducts);
    }

    deleteProduct = async (product) => {
        await ProductsService.delete(product.id);
        this.modalDelete.modal('hide');
        this.setState(
            state => state.productToDelete = null,
            () => {
                this.getProducts();
                this.notify.success(`Produto ${product.name} excluído com sucesso.`);
            }
        );
    }

    showModalDelete = (product) => {
        this.setState(
            state => state.productToDelete = product,
            () => this.modalDelete.modal('show')
        );
    }

    showModalRestore = (product) => {
        this.setState(
            state => state.productToRestore = product,
            () => this.modalRestore.modal('show') 
        );
    }

    restoreProduct = async (product) => {
        await ProductsService.restore(product.id);
        this.modalRestore.modal('hide');
        this.setState(
            state => state.productToRestore = null,
            () => {
                this.getProducts();
                this.notify.success(`Produto ${product.name} restaurado com sucesso.`);
            }
        );
    }

    showModalEdit = (product = {}) => {
        this.setState(
            state => state.productToEdit = product,
            () => this.modalEdit.modal('show')
        );
    }

    saveProduct = (e) => {
        e.preventDefault();
        const product = this.getFormData();
        ProductsService.save(product)
        .then(resp => {
            this.modalEdit.modal('hide');
            this.setState(
                state => state.productToEdit = null,
                () => {
                    this.getProducts();
                    this.notify.success(`Produto ${product.name} salvo com sucesso.`);
                }
            );
        }, error => {
            this.notify.error(`Ocorreu um erro ao tentar salvar o produto ${product.name}.`);
        });
    }
    
    getFormData = () => {
        const formData = this.formEdit.serializeArray();
        const product = {};
        formData.forEach(field => product[field.name] = field.value);
        if (product.active && product.active === 'on') product.active = 1 
        else product.active = 0;
        if (!product.id) {
            delete product.id;
        }
        return product;
    }

    handleFormDataChanged = () => {
        const product = this.getFormData();
        this.setState(state => state.productToEdit = product);
    }

    renderRows = () => {

        if (!this.state.products.length) {
            return (
                <tr key={0}>
                    <td colSpan="7">
                        Nada a exibir por enquanto :(
                    </td>
                </tr>
            );
        }

        return this.state.products.map(product => (
            <tr key={product.id}>
                <td data-title="ID:">
                    {product.id}
                </td>
                <td data-title="Nome:" title={product.description}>
                    {product.name}
                </td>
                <td data-title="Ativo:">
                    <i className={`fa fa-${product.active ? 'check' : 'times'}`}></i>
                </td>
                <td data-title="Criado em:">
                    {dateFormatBr(product.created_at.date)}
                </td>
                <td data-title="Estoque:">
                    <span className="float-lg-right float-xl-right">
                        {product.stock}
                    </span>
                </td>
                <td data-title="Preço:">
                    <span className="float-lg-right float-xl-right">
                        R${numberFormatBr(product.price)}
                    </span>
                </td>
                <td data-title="Ações: ">
                    <span className="float-lg-right float-xl-right">
                        {this.state.onlyTrashed ? (
                            <button type="button" className="btn btn-sm btn-primary btn-actions"
                                title="Restaurar produto"
                                onClick={() => this.showModalRestore(product)}>
                                <i className="fa fa-thumbs-up"></i>
                            </button>
                        ) : (
                            <span>
                                <button type="button" className="btn btn-sm btn-success btn-actions" 
                                    title={`Editar o produto ${product.name}`}
                                    onClick={() => this.showModalEdit(product)}>
                                    <i className="fa fa-edit"></i>
                                </button>
                                <Link to={`/products/${product.id}/categories/list`}>
                                    <button type="button" className="btn btn-sm btn-success btn-actions" 
                                        title={`Configurar categorias vinculadas ao produto ${product.name}`}>
                                        <i className="fa fa-link"></i>
                                    </button>
                                </Link>
                                {/* &nbsp;
                                <a [routerLink]="['/products', product.id, 'inputs', 'list']" 
                                    title="Registrar entrada de produto {{product.name}}">
                                    <i class="fas fa-plus-square"></i>
                                </a>
                                &nbsp;
                                <a [routerLink]="['/products', product.id, 'outputs', 'list']" 
                                    title="Registrar saída de produto {{product.name}}">
                                    <i class="fas fa-minus-square"></i>
                                </a>
                                &nbsp;
                                <a [routerLink]="['/products', product.id, 'categories', 'list']" 
                                    title="Configurar categorias vinculadas ao produto {{product.name}}">
                                    <i class="fas fa-box-open"></i>
                                </a>
                                &nbsp;
                                <a [routerLink]="['/products', product.id, 'photos', 'list']" 
                                    title="Gerenciar as fotos vinculadas ao produto {{product.name}}">
                                    <i class="fas fa-images"></i>
                                </a>
                                &nbsp;
                             */}
                                <button type="button" className="btn btn-sm btn-danger btn-actions" 
                                    title={`Excluir o produto ${product.name}`}
                                    onClick={() => this.showModalDelete(product)}>
                                    <i className="fa fa-trash-o"></i>
                                </button>
                            </span>
                        )}
                    </span>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <div className="row" id="no-more-tables">
                <h3>Listagem de Produtos</h3>
                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <td colSpan="5">
                                <button className="btn btn-primary" 
                                    onClick={() => this.showModalEdit()}>
                                    Novo produto
                                </button>
                                &nbsp;
                                <label>
                                    <input type="checkbox" name="active" onChange={this.changeOnlyTrashed} />
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
                            <th style={{ width: "35%" }}>
                                <SortColumn 
                                    column="name"
                                    showIcon={this.state.sort.column === "name"} 
                                    sortChange={this.sortChange}>
                                    Nome
                                </SortColumn>
                            </th>
                            <th style={{ width: "10%" }}>Ativo?</th>
                            <th style={{ width: "10%" }}>
                                <SortColumn 
                                    column="created_at"
                                    showIcon={this.state.sort.column === "created_at"} 
                                    sortChange={this.sortChange}>
                                    Criado em
                                </SortColumn>
                            </th>
                            <th style={{ width: "10%" }}>
                                <span className="float-lg-right float-xl-right">
                                    <SortColumn 
                                        column="stock"
                                        showIcon={this.state.sort.column === "stock"} 
                                        sortChange={this.sortChange}>
                                        Estoque
                                    </SortColumn>
                                </span>
                            </th>
                            <th style={{ width: "10%" }}>
                                <span className="float-lg-right float-xl-right">
                                    <SortColumn 
                                        column="price"
                                        showIcon={this.state.sort.column === "price"} 
                                        sortChange={this.sortChange}>
                                        Preço
                                    </SortColumn>
                                </span>
                            </th>
                            <th style={{ width: "20%" }}>
                                <span className="float-lg-right float-xl-right">
                                    Ações    
                                </span>
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
                <ProductDeleteModal 
                    modalId={DELETE_MODAL_ID}
                    product={this.state.productToDelete}
                    handleClick={this.deleteProduct} />
                <ProductEditModal 
                    modalId={EDIT_MODAL_ID}
                    formId={FORM_EDIT_ID}
                    product={this.state.productToEdit}
                    formDataChanged={this.handleFormDataChanged}
                    handleSubmit={this.saveProduct} />
                <ProductRestoreModal 
                    modalId={RESTORE_MODAL_ID}
                    product={this.state.productToRestore}
                    handleClick={this.restoreProduct} />
            </div>
        );
    }
}
export default Products;
