import React from 'react';

function DropdownMenuLoggedUser(props) {
    return (
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" 
                    href="#/" 
                    id="navbarDropdown" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false">
                    Washigton Gonçalves
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#/me">
                        Minha Conta
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#/">
                        Sair
                    </a>
                </div>
            </li>
        </ul>
    );
}
export default DropdownMenuLoggedUser;
