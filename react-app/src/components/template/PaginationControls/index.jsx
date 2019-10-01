import React, { Component } from 'react';
import If from '../If';

class PaginationControls extends Component {

    disablePreviousButton() {
        return this.props.current_page === 1 ? 'disabled' : '';
    }

    disableNextButton() {
        return this.props.current_page === this.props.last_page ? 'disabled' : ''; 
    }

    render() {
        return (
            <If test={this.props.last_page > 1}>
                <nav>
                    <ul className={`pagination pagination-sm justify-content-${this.props.alignCenter ? 'center' : 'end'}`}>
                        <li className={`page-item ${this.disablePreviousButton()}`}>
                            <a className="page-link" href="#" onClick={() => this.props.navigate(this.props.current_page-1)}>
                                <span>&laquo;</span>&nbsp;Anterior
                            </a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="#">
                                {this.props.current_page}
                            </a>
                        </li>
                        <li className={`page-item ${this.disableNextButton()}`}>
                            <a className="page-link" href="#" onClick={() => this.props.navigate(this.props.current_page+1)}>
                                Próximo&nbsp;<span>&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </If>
        );
    }
} 
export default PaginationControls;
