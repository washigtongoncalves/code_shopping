import CategoriesService from '../services/CategoriesService';

export function sortChange(newSort = { column: 'id', order: 'ASC' }) {
    return {
        type: 'SORT_CHANGE_CATEGORIES',
        payload: newSort
    };
}

export function getCategories(paramns = {}) {
    return {
        type: 'GET_CATEGORIES',
        payload: CategoriesService.list(paramns)
    }
}

export function changeSearchTerm(term = '') {
    return {
        type: 'CHANGE_SEARCH_TERM_CATEGORIES',
        payload: term
    }
}