import React from 'react';
import { Link } from 'react-router-dom';

function Logo(props) {
    return (
        <Link className="navbar-brand" to="/home">
            {props.appTitle}
        </Link>
    );
}
export default Logo;
