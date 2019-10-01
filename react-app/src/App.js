import React from 'react';
import { HashRouter } from 'react-router-dom';

import Menu from './components/template/Menu';
import Routes from './Routes';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

function App(props) {
    return (
        <HashRouter>
            <div className="app">
                <Menu appTitle="Code Shopping" />
                <Routes />
            </div>
        </HashRouter>
    );
}
export default App;
