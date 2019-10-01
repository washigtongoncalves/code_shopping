import React, { Component } from 'react';

class SortColumn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: {
                column: props.column,
                order: 'DESC'
            }
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => {
            state.sort.order = state.sort.order === 'ASC' ? 'DESC' : 'ASC';
            return state; 
        });
        this.props.sortChange(this.state.sort);
    }

    render() {
        return (
            <button type="button" className="link-button" onClick={this.handleClick}>
                {this.props.children}&nbsp;
                <i className={`fa fa-${this.state.sort.order === 'ASC' ? 'caret-down' : 'caret-up'}`}></i>
            </button>
        );
    }
}
export default SortColumn;