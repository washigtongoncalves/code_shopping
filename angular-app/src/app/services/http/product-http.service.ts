import { Injectable } from '@angular/core';
import { HttpResourceAbstract } from './http-resource.abstract';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService extends HttpResourceAbstract<ProductInterface> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
    this.url += '/products';
  }
}
