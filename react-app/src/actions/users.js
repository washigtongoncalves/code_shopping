import UsersService from '../services/UsersService';

export function sortChange(newSort = { column: 'id', order: 'ASC' }) {
    return {
        type: 'SORT_CHANGE_USERS',
        payload: newSort
    };
}

export function getUsers(paramns = {}) {
    return {
        type: 'GET_USERS',
        payload: UsersService.list(paramns)
    }
}

export function changeSearchTerm(term = '') {
    return {
        type: 'CHANGE_SEARCH_TERM_USERS',
        payload: term
    }
}

export function changeOnlyTrashed(onlyTrashed = 0) {
    return {
        type: 'CHANGE_ONLY_TRASHED_USERS',
        payload: onlyTrashed <= 0 ? 0 : 1
    }
}