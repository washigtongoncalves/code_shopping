import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategoryInterface } from '../../interfaces/product-category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  protected baseUrl = 'http://localhost:8000/api';
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

  list(productId: number): Observable<ProductCategoryInterface> {
    return this.http.get<{ data: ProductCategoryInterface }>(
      this.getUrl(productId),
      { headers : this.getHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }

  create(productId: number, categoriesIds: Array<number>): Observable<ProductCategoryInterface> {
    return this.http.post<{ data: ProductCategoryInterface }>(
      this.getUrl(productId),
      { categories: categoriesIds },
      { headers : this.getHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }

  destroy(productId: number, categoryId: number): Observable<any> {
    return this.http.delete<any>(
        this.getUrl(productId, categoryId),
        { headers: this.getHeaders() }
    );
  }

  getUrl(productId: number, categoryId?: number): string {
    let url = `${this.baseUrl}/products/${productId}/categories/`;
    if (categoryId) {
      url += categoryId;
    }
    return url;
  }

  getHeaders() {
    return this.headers;
  }
}
