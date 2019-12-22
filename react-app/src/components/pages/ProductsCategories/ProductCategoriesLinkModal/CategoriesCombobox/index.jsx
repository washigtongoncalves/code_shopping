import React, { Component } from 'react';

import CategoriesService from '../../../../../services/CategoriesService';

const INITIAL_STATE = {
    allCategories: [],
    selectedCategories: []
};
class CategoriesCombobox extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentWillMount() {
        this.getAllCategories();
    }

    componentDidUpdate() {
        if (
            this.state.selectedCategories.length === 0 && 
            this.props.selectedCategories.length > 0
        ) {
            const selectedCategories = this.props.selectedCategories.map((category, index) => {
                return category.id;
            });
            this.setState(state => state.selectedCategories = selectedCategories);
        }
    }

    getAllCategories = async() => {
        const { data } = await CategoriesService.getAllCategories();
        const allCategories = data.data;
        this.setState(state => { 
            state.allCategories = allCategories;
            return state; 
        });
    }

    handleChange = (event) => {
        const category = Number(event.target.value);
        this.setState(state => {
            if (!state.selectedCategories.includes(category)) {
                state.selectedCategories.push(category);
            }
            this.props.syncState(state); // Envia o estado para o componente pai
            return state;
        });
    }

    render() {
        const { allCategories, selectedCategories } = this.state;
        return (
            <select name="categories[]"  
                className="form-control"
                multiple={true}
                value={selectedCategories}
                onChange={this.handleChange}>
                    {allCategories && allCategories.map((category, index) => (
                        <option 
                            value={category.id} 
                            key={category.id}>
                            {category.name}
                        </option>
                    ))}
            </select>
        );
    }
} 
export default CategoriesCombobox;
