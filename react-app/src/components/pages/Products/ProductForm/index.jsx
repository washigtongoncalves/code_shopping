import React, { Fragment } from 'react';

function ProductForm(props) {
    const product = props.product;
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
                    required
                    placeholder="Informe um nome para o produto"
                    onChange={() => props.formDataChanged()}
                    value={product && product.name ? product.name : ''}
                    maxLength="30" />
                <input type="hidden" 
                    name="id" 
                    defaultValue={product && product.id ? product.id : ''} />
            </div>
            <div className="form-group">
                <label htmlFor="description">
                    Descrição
                </label>
                <textarea 
                    id="description"
                    name="description"
                    className="form-control no-resize"
                    placeholder="Informe uma descrição para o produto"
                    onChange={() => props.formDataChanged()}
                    value={product && product.description ? product.description : ''}
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="price">
                    Preço
                </label>
                <input type="number" 
                    id="price"
                    name="price"
                    className="form-control"
                    min="0.01" 
                    step="0.01"
                    onChange={() => props.formDataChanged()}
                    defaultValue={product && product.price ? product.price : 1} />
            </div>
            <div className="form-group form-check">
                <input type="checkbox"
                    id="active" 
                    name="active" 
                    className="form-check-input"
                    checked={!product || product.active}
                    defaultValue={product && product.active ? 1 : 0}
                    onChange={() => props.formDataChanged()} />
                <label htmlFor="active">
                    Ativo?
                </label>
            </div>
        </Fragment>
    );
}
export default ProductForm;
