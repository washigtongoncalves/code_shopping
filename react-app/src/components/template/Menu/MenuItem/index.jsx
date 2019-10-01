import React from 'react';
import { Link } from 'react-router-dom';

function MenuItem(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={props.to}>
                {props.label}
            </Link>
        </li>
    );
} 
export default MenuItem;
