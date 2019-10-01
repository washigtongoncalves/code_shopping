import React from 'react';
import MenuIcon from './MenuIcon';
import Logo from '../Logo';
import DropdownMenuLoggedUser from './DropdownMenuLoggedUser';

function Menu(props) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Logo appTitle={props.appTitle} />
            <MenuIcon />
            <div className="collapse navbar-collapse" id="navbars">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#/categories">
                            Categorias
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/products">
                            Produtos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/inputs">
                            Entradas
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/outputs">
                            Saídas
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/users">
                            Usuários
                        </a>
                    </li>
                </ul>
                <DropdownMenuLoggedUser />
            </div>
        </nav>
    );
}
export default Menu;