import ProductsOutputsService from '../services/ProductsOutputsService';

export function sortChange(newSort = { column: 'id', order: 'ASC' }) {
    return {
        type: 'SORT_CHANGE_PRODUCTS_OUTPUTS',
        payload: newSort
    };
}

export function getOutputs(paramns = {}) {
    return {
        type: 'GET_PRODUCTS_OUTPUTS',
        payload: ProductsOutputsService.list(paramns)
    }
}

export function changeSearchTerm(term = '') {
    return {
        type: 'CHANGE_SEARCH_TERM_PRODUCTS_OUTPUTS',
        payload: term
    }
}