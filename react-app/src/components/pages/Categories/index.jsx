import React, { Component } from 'react';
import CategoriesService from '../../../services/CategoriesService';
import { dateFormatBr } from '../../../functions/formater';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    async componentWillMount() {
        const { data } = await CategoriesService.list();
        const categories = data.data;
        this.setState(state => state.categories = categories);
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
                                
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: "5%" }}>ID</th>
                            <th style={{ width: "50%" }}>Nome</th>
                            <th style={{ width: "15%" }}>Ativa?</th>
                            <th style={{ width: "15%" }}>Criada em</th>
                            <th style={{ width: "15%" }}>Ações</th>
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
export default Categories;
