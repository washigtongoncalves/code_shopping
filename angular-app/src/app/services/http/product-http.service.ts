import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { MetaPaginationInterface } from 'src/app/interfaces/meta-pagination.interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

    private url = 'http://localhost:8000/api/products';
    private token: string;
    private headers;

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.headers = {
            Authorization : `Bearer ${this.token}`
        };
    }

    list(page: number): Observable<{ data: Array<ProductInterface>, meta: MetaPaginationInterface }> {
        const params = new HttpParams({
            fromObject: {
                page: page + '' // necessário fazer o cast para string para evitar mensagens de erro
            }
        });
        return this.http.get<{ data: Array<ProductInterface>, meta: MetaPaginationInterface }>(
            this.getUrl(),
            { params, headers : this.getHeaders() }
        );
    }

    create(product: ProductInterface): Observable<ProductInterface> {
        return this.http.post<ProductInterface>(
            this.getUrl(),
            product,
            { headers : this.getHeaders() }
        );
    }

    destroy(productId: number): Observable<void> {
        return this.http.delete<void>(
            this.getUrl() + `/${productId}`,
            { headers : this.getHeaders() }
        );
    }

    getUrl() {
        return this.url;
    }

    getHeaders() {
        return this.headers;
    }
  }
