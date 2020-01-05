const INITIAL_STATE = {
    products: [],
    onlyTrashed: 0,
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};
export default function products(state = INITIAL_STATE, action) {
    let newState = { ...state };
    switch (action.type) {
        case 'SORT_CHANGE_PRODUCTS' :
            newState.sort = action.payload;
            return newState;
        case 'GET_PRODUCTS' :
            newState.products   = action.payload.data.data;
            newState.pagination = action.payload.data.meta;
            return newState;
        case 'CHANGE_SEARCH_TERM_PRODUCTS' :
            newState.search = action.payload;
            return newState;
        case 'CHANGE_ONLY_TRASHED_PRODUCTS' :
            newState.onlyTrashed = action.payload;
            return newState;
        default :
            return newState;
    }
}
