import { Injectable } from '@angular/core';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { HttpResourceAbstract } from './http-resource.abstract';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService extends HttpResourceAbstract<CategoryInterface> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
    this.url += '/categories';
  }
}
