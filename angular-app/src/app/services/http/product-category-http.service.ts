import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductInterface } from '../../interfaces/product.interface';
import { CategoryInterface } from '../../interfaces/category.interface';

interface ProductCategoryInterface {
  product: ProductInterface; 
  categories: Array<CategoryInterface>; 
}

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  protected url = 'http://localhost:8000/api';
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
    const listUrl = `${this.url}/products/${productId}/categories/`;
    return this.http.get<{ data: ProductCategoryInterface }>(
      listUrl,
      { headers : this.getHeaders() }
    ).pipe(
      map((response) => response.data)
    );
  }

  getHeaders() {
    return this.headers;
  }
}
