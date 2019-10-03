import React, { Fragment } from 'react';

function CategoryForm(props) {
    const category = props.category;
    return (
        <Fragment>
            <div className="form-group">
                <label htmlFor="name">
                    Nome
                </label>
                <input type="text" 
                    className="form-control" 
                    id="name"
                    name="name"
                    maxLength="30"
                    defaultValue={category && category.name ? category.name : ''}
                    placeholder="Informe um nome para a categoria"
                    required />
                <input type="hidden" 
                    name="id" 
                    defaultValue={category && category.id ? category.id : ''} />
            </div>
            <div className="form-group form-check">
                <input type="checkbox" 
                    className="form-check-input"
                    defaultChecked={!category || category.active}
                    id="active"
                    name="active" />
                <label htmlFor="active">
                    Ativo?
                </label>
            </div>
        </Fragment>
    );
}
export default CategoryForm;
