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
                    <ul className={`pagination pagination-${this.props.large ? 'lg' : 'sm'} justify-content-${this.props.center ? 'center' : 'end'}`}>
                        <li className={`page-item ${this.disablePreviousButton()}`}>
                            <button className="btn-link page-link" 
                               onClick={() => this.props.navigate(this.props.current_page-1)}>
                                <span>&laquo;</span>&nbsp;Anterior
                            </button>
                        </li>
                        <li className="page-item active">
                            <button type="button" className="btn-link page-link">
                                {this.props.current_page}
                            </button>
                        </li>
                        <li className={`page-item ${this.disableNextButton()}`}>
                            <button type="button" className="btn-link page-link"
                               onClick={() => this.props.navigate(this.props.current_page+1)}>
                                Próximo&nbsp;<span>&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </If>
        );
    }
} 
export default PaginationControls;
