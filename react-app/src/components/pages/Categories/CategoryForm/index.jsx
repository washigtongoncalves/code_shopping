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
                    name="name"
                    maxLength="30"
                    value={category && category.name ? category.name : ''}
                    placeholder="Informe um nome para a categoria"
                    required
                    onChange={() => props.formDataChanged()} />
                <input type="hidden" 
                    name="id" 
                    defaultValue={category && category.id ? category.id : ''} />
            </div>
            <div className="form-group form-check">
                <input type="checkbox" 
                    className="form-check-input"
                    checked={!category || category.active}
                    name="active"
                    onChange={() => props.formDataChanged()}  />
                <label htmlFor="active">
                    Ativo?
                </label>
            </div>
        </Fragment>
    );
}
export default CategoryForm;
