const INITIAL_STATE = {
    outputs: [],
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};
export default function outputs(state = INITIAL_STATE, action) {
    let newState = { ...state };
    switch (action.type) {
        case 'SORT_CHANGE_PRODUCTS_OUTPUTS' :
            newState.sort = action.payload;
            return newState;
        case 'GET_PRODUCTS_OUTPUTS' :
            newState.outputs = action.payload.data.data;
            newState.pagination = action.payload.data.meta;
            return newState;
        case 'CHANGE_SEARCH_TERM_PRODUCTS_OUTPUTS' :
            newState.search = action.payload;
            return newState;
        default :
            return newState;
    }
}
