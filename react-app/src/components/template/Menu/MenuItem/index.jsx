import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function MenuItem(props) {
    const active = props.location.pathname === props.to ? 'active' : '';
    return (
        <li className="nav-item">
            <Link className={`nav-link ${active}`} to={props.to}>
                {props.label}
            </Link>
        </li>
    );
} 
export default withRouter(MenuItem);
