export interface SearchParamsInterface {
    page?: number;
    trashed?: any;
    all?: any;
    search?: string;
    sort?: {
        column: string;
        sort: string;
    };
}
