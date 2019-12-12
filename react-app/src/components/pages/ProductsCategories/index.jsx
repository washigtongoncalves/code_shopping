import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NotifyMessageService from '../../../services/NotifyMessageService';
import ProductsCategoriesServices from '../../../services/ProductsCategoriesServices';
import { dateFormatBr } from '../../../functions/formater';

const INITIAL_STATE = {
    product: [],
    categories: []
};

class ProductsCategories extends Component {

    constructor(props) {
        super(props);
        this.state  = INITIAL_STATE;
        this.notify = new NotifyMessageService();
        this.productId = props.match.params.id;
    }

    componentWillMount() {
        this.getCategories();
    }

    getCategories = async () => {
        const { data } = await ProductsCategoriesServices.getCategories(this.productId);
        const { product, categories } = data.data;
        this.setState(state => {
            state.product = product;
            state.categories = categories;
            return state;
        });
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
                <td data-title="Nome:">
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
                        onClick={() => this.showModalDelete(product)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ));
    }

    render() {
        const { product } = this.state;
        return (
            <div className="row" id="no-more-tables">
                <h3>Categorias do produto {product.name}</h3>
                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <td colSpan="5">
                                <button className="btn btn-primary">
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
                            <th style={{ width: "30%" }}>Nome</th>
                            <th style={{ width: "15%" }}>Ativa?</th>
                            <th style={{ width: "25%" }}>Criada em</th>
                            <th style={{ width: "25%" }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.renderRows()} 
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ProductsCategories;
