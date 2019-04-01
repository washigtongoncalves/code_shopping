import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategoryInterface } from '../../interfaces/product-category.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  protected baseUrl = `${environment.api.url}`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  list(productId: number): Observable<ProductCategoryInterface> {
    return this.http.get<{ data: ProductCategoryInterface }>(
      this.getUrl(productId)
    ).pipe(
      map((response) => response.data)
    );
  }

  create(productId: number, categoriesIds: Array<number>): Observable<ProductCategoryInterface> {
    return this.http.post<{ data: ProductCategoryInterface }>(
      this.getUrl(productId),
      { categories: categoriesIds }
    ).pipe(
      map((response) => response.data)
    );
  }

  destroy(productId: number, categoryId: number): Observable<any> {
    return this.http.delete<any>(
        this.getUrl(productId, categoryId)
    );
  }

  getUrl(productId: number, categoryId?: number): string {
    let url = `${this.baseUrl}/products/${productId}/categories/`;
    if (categoryId) {
      url += categoryId;
    }
    return url;
  }
}
