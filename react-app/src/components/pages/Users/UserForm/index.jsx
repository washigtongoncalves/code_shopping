import React, { Fragment } from 'react';

function UserForm(props) {
    const user = props.user;
    const editMode = user && user.id;
    return (
        <Fragment>
            <div className="form-group">
                <label htmlFor="name">
                    Nome
                </label>
                <input type="text" 
                    className="form-control" 
                    name="name"
                    required
                    placeholder="Informe um nome para o usuário"
                    onChange={() => props.formDataChanged()}
                    value={user && user.name ? user.name : ''}
                    maxLength="30" />
                <input type="hidden" 
                    name="id" 
                    defaultValue={user && user.id ? user.id : ''} />
            </div>
            <div className="form-group">
                <label htmlFor="email">
                    E-mail
                </label>
                <input type="email" 
                    className="form-control"
                    name="email"
                    required 
                    placeholder="Informe um e-mail para o usuário"
                    onChange={() => props.formDataChanged()}
                    value={user && user.email ? user.email : ''}
                    readOnly={editMode} />
            </div>
            <div className="form-group">
                <label htmlFor="password">
                    Senha
                </label>
                <input type="password"
                    className="form-control"
                    name="password"
                    required
                    placeholder="Informe uma senha para o usuário"
                    onChange={() => props.formDataChanged()} />
            </div>
        </Fragment>
    );
}
export default UserForm;
