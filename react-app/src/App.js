import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Menu from './components/template/Menu';
import Routes from './Routes';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

function App(props) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="app">
                    <Menu appTitle="Code Shopping" />
                    <br />
                    <main>
                        <div className="container">
                            <Routes />
                        </div>
                    </main>
                </div>
            </BrowserRouter>
        </Provider>
    );
}
export default App;
