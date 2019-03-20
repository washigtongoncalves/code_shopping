import { Observable } from 'rxjs/internal/Observable';
import { MetaPaginationInterface } from 'src/app/interfaces/meta-pagination.interface';

export interface HttpResourceInterface<T> {
    list(page: number): Observable<{ data: Array<T>, meta: MetaPaginationInterface }>;
    get(id: number): Observable<T>;
    create(data: T): Observable<T>;
    update(id: number, data: T): Observable<T>;
    destroy(id: number): Observable<any>;
    getUrl(): string;
    getHeaders();
}
