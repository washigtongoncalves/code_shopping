import ProductsService from '../services/ProductsService';

export function sortChange(newSort = { column: 'id', order: 'ASC' }) {
    return {
        type: 'SORT_CHANGE_PRODUCTS',
        payload: newSort
    };
}

export function getProducts(paramns = {}) {
    return {
        type: 'GET_PRODUCTS',
        payload: ProductsService.list(paramns)
    }
}

export function changeSearchTerm(term = '') {
    return {
        type: 'CHANGE_SEARCH_TERM_PRODUCTS',
        payload: term
    }
}

export function changeOnlyTrashed(onlyTrashed = 0) {
    return {
        type: 'CHANGE_ONLY_TRASHED_PRODUCTS',
        payload: onlyTrashed <= 0 ? 0 : 1
    }
}