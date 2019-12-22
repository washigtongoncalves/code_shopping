import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import $ from 'jquery';

import NotifyMessageService from '../../../services/NotifyMessageService';
import ProductsCategoriesServices from '../../../services/ProductsCategoriesServices';
import ProductCategoryUnlinkModal from './ProductCategoryUnlinkModal';
import ProductCategoriesLinkModal from './ProductCategoriesLinkModal';
import { dateFormatBr } from '../../../functions/formater';

const INITIAL_STATE = {
    blocking: true,
    productId: null,
    product: [],
    categories: []
};
const UNLINK_MODAL_ID = 'unlink-category-modal';
const LINK_MODAL_ID = 'link-categories-modal';
class ProductsCategories extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.modalUnlink = this.modaLink = this.categoryToUnlink = null;
        this.notify = new NotifyMessageService();
        this.state.productId = props.match.params.id;
    }

    componentWillMount() {
        this.getCategories();
    }

    componentDidMount = () => {
        this.modalUnlink = $(`#${UNLINK_MODAL_ID}`);
        this.modalLink   = $(`#${LINK_MODAL_ID}`);
    }

    getCategories = () => {
        this.setState(
            state => state.blocking = true,
            async () => {
                const { data } = await ProductsCategoriesServices.getCategories(this.state.productId);
                const { product, categories } = data.data;
                this.setState(state => {
                    state.product = product;
                    state.categories = categories;
                    state.blocking = false;
                    return state;
                });
            } 
        );
    }

    showModalUnlink = (category) => {
        this.setState(
            state => state.categoryToUnlink = category,
            () => this.modalUnlink.modal('show')
        );
    }

    unlinkCategory = async (product, category) => {
        await ProductsCategoriesServices.delete(product.id, category.id);
        this.modalUnlink.modal('hide');
        this.setState(
            state => state.categoryToUnlink = null,
            () => {
                this.getCategories();
                this.notify.success('Sucesso ao desvincular a categoria.');
            }
        );
    }

    linkCategories = async (categories) => {
        await ProductsCategoriesServices.create(this.state.productId, categories);
        this.modalLink.modal('hide');
        this.getCategories();
        this.notify.success('Sucesso ao vincular as categorias.');
    }

    renderRows() {

        const { product, categories } = this.state;
        
        if (!categories.length) {
            return (
                <tr key={0}>
                    <td colSpan="5">
                        Nenhuma categoria vinculada ainda :(
                    </td>
                </tr>
            );
        }

        return categories.map(category => (
            <tr key={category.id}>
                <td data-title="ID:">
                  {category.id}
                </td>
                <td data-title="Categoria:">
                    {category.name}
                </td>
                <td data-title="Ativa:">
                    <i className={'fa ' + (category.active ? 'fa-check' : 'fa-times')}></i>
                </td>
                <td data-title="Criada em:">
                    {dateFormatBr(category.created_at.date)}
                </td>
                <td data-title="Ações: ">
                    <button type="button" className="btn btn-sm btn-danger btn-actions" 
                        title={`Desvincular do produto ${product.name}`}
                        onClick={() => this.showModalUnlink(category)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        const { product } = this.state;
        return (
            <BlockUi tag="div" blocking={this.state.blocking} className="row" id="no-more-tables">
                <h3>Categorias do produto {product.name}</h3>
                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <td colSpan="5">
                                <button className="btn btn-primary" 
                                    onClick={() => this.modalLink.modal('show')}>
                                    Vincular
                                </button>
                                <Link to="/products/list">
                                    <button className="btn">
                                        Voltar
                                    </button>
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: "5%"  }}>ID</th>
                            <th style={{ width: "30%" }}>Categoria</th>
                            <th style={{ width: "15%" }}>Ativa?</th>
                            <th style={{ width: "25%" }}>Criada em</th>
                            <th style={{ width: "25%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderRows()} 
                    </tbody>
                </table>
                <ProductCategoryUnlinkModal 
                    modalId={UNLINK_MODAL_ID}
                    product={this.state.product}
                    category={this.state.categoryToUnlink}
                    handleClick={this.unlinkCategory} />
                <ProductCategoriesLinkModal 
                    modalId={LINK_MODAL_ID}
                    product={this.state.product}
                    categories={this.state.categories}
                    handleClick={this.linkCategories} />
            </BlockUi>
        );
    }
}
export default ProductsCategories;
