import React from 'react';
import MenuIcon from './MenuIcon';
import Logo from '../Logo';
import MenuItenContainer from './MenuItensContainer';
import MenuItem from './MenuItem';
import DropdownMenuLoggedUser from './DropdownMenuLoggedUser';

function Menu(props) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Logo appTitle={props.appTitle} />
            <MenuIcon />
            <div className="collapse navbar-collapse" id="navbars">
                <MenuItenContainer>
                    <MenuItem label="Categorias" to="/categories/list" />
                    <MenuItem label="Produtos" to="/products/list" />
                    <MenuItem label="Entradas" to="/inputs/list" />
                    <MenuItem label="Saídas" to="/outputs/list" />
                    <MenuItem label="Usuários" to="/users/list" />
                </MenuItenContainer>
                <DropdownMenuLoggedUser />
            </div>
        </nav>
    );
}
export default Menu;