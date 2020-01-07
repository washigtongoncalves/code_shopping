import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './floating-label.css';

class Login extends Component {

    validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'E-mail é obrigatório';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Informe um e-mail válido';
        }
        if (!values.password) {
            errors.password = 'A senha é obrigatória';
        } 
        return errors;
    }

    submit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }

    render() {
        return (
            <div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={this.validate}
                    onSubmit={this.submit}
                >
                    {({ isSubmitting }) => (
                        <Form className="form-signin">
                            <div className="text-center mb-4">
                                <h1 className="h3 mb-3 font-weight-normal">
                                    <i className="fa fa-code"></i> Code Shopping
                                </h1>
                            </div>
                            <div className="form-label-group">
                                <Field 
                                    type="email" 
                                    name="email"
                                    id="inputEmail" 
                                    className="form-control" 
                                    placeholder="Informe seu e-mail" 
                                    required 
                                    autofocus />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                                <label for="inputEmail">
                                    Seu e-mail
                                </label>
                            </div>
                            <div className="form-label-group">
                                <Field 
                                    type="password" 
                                    name="password"
                                    id="inputPassword" 
                                    className="form-control" 
                                    placeholder="Digite sua senha" 
                                    required />
                                <ErrorMessage name="password" component="span" className="text-danger" />
                                <label for="inputPassword">
                                    Sua senha
                                </label>
                            </div>
                            <button  className="btn btn-lg btn-primary btn-block" type="submit" disabled={isSubmitting}>
                                <i className="fa fa-sign-in"></i> Acessar
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}
export default Login;
