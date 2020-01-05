import ProductsInputsService from '../services/ProductsInputsService';

export function sortChange(newSort = { column: 'id', order: 'ASC' }) {
    return {
        type: 'SORT_CHANGE_PRODUCTS_INPUTS',
        payload: newSort
    };
}

export function getInputs(paramns = {}) {
    return {
        type: 'GET_PRODUCTS_INPUTS',
        payload: ProductsInputsService.list(paramns)
    }
}

export function changeSearchTerm(term = '') {
    return {
        type: 'CHANGE_SEARCH_TERM_PRODUCTS_INPUTS',
        payload: term
    }
}