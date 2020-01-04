const INITIAL_STATE = {
    categories: [],
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};
export default function categories(state = INITIAL_STATE, action) {
    let newState = { ...state };
    switch (action.type) {
        case 'SORT_CHANGE_CATEGORIES' :
            newState.sort = action.payload;
            return newState;
        case 'GET_CATEGORIES' :
            newState.categories = action.payload.data.data;
            newState.pagination = action.payload.data.meta;
            return newState;
        case 'CHANGE_SEARCH_TERM_CATEGORIES' :
            newState.search = action.payload;
            return newState;
        default :
            return newState;
    }
}
