import { Injectable } from '@angular/core';
import { HttpResourceAbstract } from './http-resource.abstract';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService extends HttpResourceAbstract<ProductInterface> {
  constructor(http: HttpClient) {
    super(http);
    this.url += 'products';
  }
}
