import React, { Component } from 'react';
import CategoriesService from '../../../services/CategoriesService';
import { dateFormatBr } from '../../../functions/formater';
import SortColumn from '../../template/SortColumn';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            sort: { column: null }
        };
        this.sortChange = this.sortChange.bind(this);
    }

    componentWillMount() {
        this.getCategories();
    }

    async getCategories(paramns = {}) {
        const { data } = await CategoriesService.list(paramns);
        const categories = data.data;
        this.setState(state => state.categories = categories);
    }

    sortChange(sort) {
        this.setState(state => state.sort = sort);
        this.getCategories({ page: 1, sort});
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
            </div>
        );
    }
}
export default Categories;
