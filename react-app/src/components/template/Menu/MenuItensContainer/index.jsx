import React from 'react';

function MenuItensContainer(props) {
    return (
        <ul className="navbar-nav mr-auto">
            {props.children}
        </ul>
    );
}
export default MenuItensContainer;
