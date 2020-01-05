const INITIAL_STATE = {
    users: [],
    onlyTrashed: 0,
    sort: { 
        column: 'id',
        order: 'ASC' 
    },
    search: '',
    pagination: {}
};
export default function users(state = INITIAL_STATE, action) {
    let newState = { ...state };
    switch (action.type) {
        case 'SORT_CHANGE_USERS' :
            newState.sort = action.payload;
            return newState;
        case 'GET_USERS' :
            newState.users = action.payload.data.data;
            newState.pagination = action.payload.data.meta;
            return newState;
        case 'CHANGE_SEARCH_TERM_USERS' :
            newState.search = action.payload;
            return newState;
        case 'CHANGE_ONLY_TRASHED_USERS' :
            newState.onlyTrashed = action.payload;
            return newState;
        default :
            return newState;
    }
}
