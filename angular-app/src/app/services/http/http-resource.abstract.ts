import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResourceInterface } from './http-resource.interface';
import { MetaPaginationInterface } from '../../interfaces/meta-pagination.interface';

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

    list(page: number, onlyTrashed: boolean = false): Observable<{ data: Array<T>, meta: MetaPaginationInterface }> {
        const params = new HttpParams({
            fromObject: {
                page: page + '' // necessário fazer o cast para string para evitar mensagens de erro
            }
        });
        return this.http.get<{ data: Array<T>, meta: MetaPaginationInterface }>(
            this.getUrl() + `/?trashed=` + (onlyTrashed ? 1 : 0),
            { params, headers : this.getHeaders() }
        );
    }

    get(id: number, onlyTrashed: boolean = false): Observable<T> {
        return this.http.get<{ data: T }>(
            this.getUrl() + `/${id}?trashed=` + (onlyTrashed ? 1 : 0),
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
        return this.http.patch<any>(
            this.getUrl() + `/${id}/restore?trashed=1`,
            {},
            { headers: this.getHeaders() }
        );
    }

    getUrl(): string {
        return this.url;
    }

    getHeaders() {
        return this.headers;
    }
}
