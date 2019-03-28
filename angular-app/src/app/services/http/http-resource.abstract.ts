import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResourceInterface } from './http-resource.interface';
import { MetaPaginationInterface } from '../../interfaces/meta-pagination.interface';
import { SearchParamsInterface } from '../../interfaces/search-params.interface';
import { SearchParamsBuilder } from '../../interfaces/search-params-builder.class';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

export abstract class HttpResourceAbstract<T> implements HttpResourceInterface<T> {

    protected url = `${environment.api.url}`;
    protected http: HttpClient;
    protected authService: AuthService;

    constructor(http: HttpClient, authService: AuthService) {
        this.http = http;
        this.authService = authService;
    }

    list(searchParams: SearchParamsInterface): Observable<{ data: Array<T>, meta: MetaPaginationInterface }> {
        const params = new HttpParams({
            fromObject: new SearchParamsBuilder(searchParams).makeObject()
        });
        return this.http.get<{ data: Array<T>, meta: MetaPaginationInterface }>(
            this.getUrl(),
            { params }
        );
    }

    get(id: number): Observable<T> {
        return this.http.get<{ data: T }>(
            this.getUrl() + `/${id}`
        ).pipe(
            map(response => response.data)
        );
    }

    create(data: T): Observable<T> {
        return this.http.post<T>(
            this.getUrl(),
            data
        );
    }

    update(id: number, data: T): Observable<T> {
        return this.http.put<T>(
            this.getUrl() + `/${id}`,
            data
        );
    }

    destroy(id: number): Observable<any> {
        return this.http.delete<any>(
            this.getUrl() + `/${id}`
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
            { params }
        );
    }

    getUrl(): string {
        return this.url;
    }
}
