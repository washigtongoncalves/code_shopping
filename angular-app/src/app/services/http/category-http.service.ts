import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryInterface } from 'src/app/interfaces/category.interface';

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

    list()
    {
        return this.http.get<{ data: Array<CategoryInterface> }>(
            this.getUrl(), 
            { headers : this.getHeaders() }
        );
    }

    get(categoryId: number)
    {
        return this.http.get<{ data: Array<CategoryInterface> }>(
            this.getUrl() + `/${categoryId}`, 
            { headers : this.getHeaders() }
        );
    }

    create(category: CategoryInterface)
    {
        return this.http.post(
            this.getUrl(), 
            category, 
            { headers : this.getHeaders() }
        );
    }

    update(category: CategoryInterface)
    {
        return this.http.put(
            this.getUrl() + `/${category.id}`, 
            category, 
            { headers : this.getHeaders() }
        );
    }

    destroy(category: CategoryInterface)
    {
        return this.http.delete(
            this.getUrl() + `/${category.id}`, 
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
