import { SearchParamsInterface } from './search-params.interface';

export class SearchParamsBuilder {

    constructor(private searchParams: SearchParamsInterface) { }

    makeObject(): any {
        const sParams: any = {};
        if (this.searchParams.page) {
            sParams.page = `${this.searchParams.page}`;
        }
        if (this.searchParams.trashed) {
            sParams.trashed = '1';
        }
        if (this.searchParams.all) {
            sParams.all = '1';
            delete sParams.page;
        }
        if (this.searchParams.sortColumn.column && this.searchParams.sortColumn.sort) {
            const sort = this.searchParams.sortColumn.sort === 'ASC' ? '+' : '-';
            sParams.sort = sort + this.searchParams.sortColumn.column;
        }
        return sParams;
    }
}
