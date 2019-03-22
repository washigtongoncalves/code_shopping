import { Observable } from 'rxjs/internal/Observable';
import { MetaPaginationInterface } from 'src/app/interfaces/meta-pagination.interface';
import { SearchParamsInterface } from '../../interfaces/search-params.interface';

export interface HttpResourceInterface<T> {
    list(searchParams: SearchParamsInterface): Observable<{ data: Array<T>, meta: MetaPaginationInterface }>;
    get(id: number): Observable<T>;
    create(data: T): Observable<T>;
    update(id: number, data: T): Observable<T>;
    destroy(id: number): Observable<any>;
    restore(id: number): Observable<any>;
    getUrl(): string;
    getHeaders();
}
