import { Injectable } from '@angular/core';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { HttpResourceAbstract } from './http-resource.abstract';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService extends HttpResourceAbstract<CategoryInterface> {
  constructor(http: HttpClient) {
    super(http);
    this.url += 'categories';
  }
}
