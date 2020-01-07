import React, { Component } from 'react';

import './floating-label.css';

class Login extends Component {
    render() {
        return (
            <form className="form-signin">
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">
                        <i className="fa fa-code"></i> Code Shopping
                    </h1>
                </div>
                <div className="form-label-group">
                    <input type="email" 
                           id="inputEmail" 
                           className="form-control" 
                           placeholder="Informe seu e-mail" 
                           required 
                           autofocus />
                    <label for="inputEmail">
                        Seu e-mail
                    </label>
                </div>
                <div className="form-label-group">
                    <input type="password" 
                           id="inputPassword" 
                           className="form-control" 
                           placeholder="Digite sua senha" 
                           required />
                    <label for="inputPassword">
                        Sua senha
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    <i className="fa fa-sign-in"></i> Acessar
                </button>
            </form>
        );
    }
}
export default Login;
