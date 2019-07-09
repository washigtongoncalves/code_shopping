import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductInputInterface } from '../../interfaces/product-input.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductInputHttpService {

  protected baseUrl = `${environment.api.url}`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  list(productId: number): Observable<ProductInputInterface> {
    return this.http.get<{ data: ProductInputInterface }>(
      this.getUrl(productId)
    ).pipe(
      map((response) => response.data)
    );
  }

  getUrl(productId: number): string {
    let url = `${this.baseUrl}/products/${productId}/inputs/`;
    return url;
  }
}
