import React, { Component } from 'react';

import CategoriesService from '../../../../../services/CategoriesService';

const INITIAL_STATE = {
    allCategories: []
};
class CategoriesCombobox extends Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentWillMount() {
        this.getAllCategories();
    }

    getAllCategories = async() => {
        const { data } = await CategoriesService.getAllCategories();
        const allCategories = data.data;
        this.setState(state => { 
            state.allCategories = allCategories;
            return state; 
        });
    }

    render() {
        const { allCategories } = this.state;
        const { input } = this.props;
        return (
            <select className="form-control" 
                multiple={true} 
                ref={input}> 
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
