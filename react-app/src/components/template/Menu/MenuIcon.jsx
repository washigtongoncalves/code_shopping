import React from 'react';

function MenuIcon(props) {
    return (
        <button className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbars" 
            aria-controls="navbars" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
    );
}
export default MenuIcon;
