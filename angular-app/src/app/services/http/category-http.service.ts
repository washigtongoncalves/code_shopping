import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService 
{
    private url = 'http://localhost:8000/api/categories';
    private token: string;
    private headers;

    constructor(private http: HttpClient) 
    { 
        this.token = localStorage.getItem('token');
        this.headers = {
            'Authorization' : `Bearer ${this.token}`
        };
    }

    list(): Observable<{ data: Array<CategoryInterface> }>
    {
        return this.http.get<{ data: Array<CategoryInterface> }>(
            this.getUrl(), 
            { headers : this.getHeaders() }
        );
    }

    get(categoryId: number): Observable<CategoryInterface>
    {
        return this.http.get<{ data: CategoryInterface }>(
            this.getUrl() + `/${categoryId}`, 
            { headers : this.getHeaders() }
        ).pipe(
            map(response => response.data)
        );
    }

    create(category: CategoryInterface): Observable<CategoryInterface>
    {
        return this.http.post<CategoryInterface>(
            this.getUrl(), 
            category, 
            { headers : this.getHeaders() }
        );
    }

    update(category: CategoryInterface): Observable<CategoryInterface>
    {
        return this.http.put<CategoryInterface>(
            this.getUrl() + `/${category.id}`, 
            category, 
            { headers : this.getHeaders() }
        );
    }

    destroy(categoryId: number): Observable<void>
    {
        return this.http.delete<void>(
            this.getUrl() + `/${categoryId}`, 
            { headers : this.getHeaders() }
        );
    }

    getUrl()
    {
        return this.url;
    }

    getHeaders()
    {
        return this.headers;
    }
}
