import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResourceInterface } from './http-resource.interface';
import { MetaPaginationInterface } from '../../interfaces/meta-pagination.interface';
import { SearchParamsInterface } from '../../interfaces/search-params.interface';
import { SearchParamsBuilder } from '../../interfaces/search-params-builder.class';

export abstract class HttpResourceAbstract<T> implements HttpResourceInterface<T> {

    protected url = 'http://localhost:8000/api/';
    protected token: string;
    protected headers;
    protected http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
        this.token = localStorage.getItem('token');
        this.headers = {
            Authorization : `Bearer ${this.token}`
        };
    }

    list(searchParams: SearchParamsInterface): Observable<{ data: Array<T>, meta: MetaPaginationInterface }> {
        const params = new HttpParams({
            fromObject: new SearchParamsBuilder(searchParams).makeObject()
        });
        return this.http.get<{ data: Array<T>, meta: MetaPaginationInterface }>(
            this.getUrl(),
            { params, headers : this.getHeaders() }
        );
    }

    get(id: number): Observable<T> {
        return this.http.get<{ data: T }>(
            this.getUrl() + `/${id}`,
            { headers : this.getHeaders() }
        ).pipe(
            map(response => response.data)
        );
    }

    create(data: T): Observable<T> {
        return this.http.post<T>(
            this.getUrl(),
            data,
            { headers : this.getHeaders() }
        );
    }

    update(id: number, data: T): Observable<T> {
        return this.http.put<T>(
            this.getUrl() + `/${id}`,
            data,
            { headers : this.getHeaders() }
        );
    }

    destroy(id: number): Observable<any> {
        return this.http.delete<any>(
            this.getUrl() + `/${id}`,
            { headers: this.getHeaders() }
        );
    }

    restore(id: number): Observable<any> {
        const params = new HttpParams({
            fromObject: {
                trashed: '1'
            }
        });
        return this.http.patch<any>(
            this.getUrl() + `/${id}/restore`,
            {},
            { params, headers: this.getHeaders() }
        );
    }

    getUrl(): string {
        return this.url;
    }

    getHeaders() {
        return this.headers;
    }
}
