import React from 'react';

function Logo(props) {
    return (
        <a className="navbar-brand" href="#/">
            {props.appTitle}
        </a>
    );
}
export default Logo;
