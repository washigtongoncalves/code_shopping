import React from 'react';

function SearchForm(props) {
    return (
        <form className="form-inline" onSubmit={props.handleSubmit}>
            <div className="col-auto">
                <input type="search" 
                    className="form-control" 
                    name="search" 
                    placeholder="Digite sua busca"
                    onChange={props.handleChange} />
            </div>
            <button className="btn btn-primary" type="submit">
                <i className="fa fa-search"></i>
            </button>
        </form>
    );
}
export default SearchForm;
