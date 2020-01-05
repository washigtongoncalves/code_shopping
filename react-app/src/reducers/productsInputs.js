const INITIAL_STATE = {
    inputs: [],
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};
export default function inputs(state = INITIAL_STATE, action) {
    let newState = { ...state };
    switch (action.type) {
        case 'SORT_CHANGE_PRODUCTS_INPUTS' :
            newState.sort = action.payload;
            return newState;
        case 'GET_PRODUCTS_INPUTS' :
            newState.inputs = action.payload.data.data;
            newState.pagination = action.payload.data.meta;
            return newState;
        case 'CHANGE_SEARCH_TERM_PRODUCTS_INPUTS' :
            newState.search = action.payload;
            return newState;
        default :
            return newState;
    }
}
