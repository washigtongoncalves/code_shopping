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
        if (this.searchParams.search && this.searchParams.search !== '') {
            sParams.search = this.searchParams.search;
        }
        if (this.searchParams.sort && this.searchParams.sort.column && this.searchParams.sort.sort) {
            const sort = this.searchParams.sort.sort === 'ASC' ? '+' : '-';
            sParams.sort = sort + this.searchParams.sort.column;
        }
        return sParams;
    }
}
