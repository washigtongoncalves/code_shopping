export interface SearchParamsInterface {
    page?: number;
    trashed?: any;
    all?: any;
    sortColumn?: {
        column: string,
        sort: string
    };
}
