import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InputInterface } from '../../interfaces/input.interface';
import { MetaPaginationInterface } from '../../interfaces/meta-pagination.interface';
import { SearchParamsInterface } from '../../interfaces/search-params.interface';
import { SearchParamsBuilder } from '../../interfaces/search-params-builder.class';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InputHttpService {

  protected url = `${environment.api.url}/inputs`;
  protected http: HttpClient;
  protected authService: AuthService;

  constructor(http: HttpClient, authService: AuthService) {
    this.http = http;
    this.authService = authService;
  }

  list(searchParams: SearchParamsInterface): Observable<{ data: Array<InputInterface>, meta: MetaPaginationInterface }> {
    const params = new HttpParams({
        fromObject: new SearchParamsBuilder(searchParams).makeObject()
    });
    return this.http.get<{ data: Array<InputInterface>, meta: MetaPaginationInterface }>(
        this.getUrl(),
        { params }
    );
  }

  create(data: { amount: number, productId: number }): Observable<InputInterface> {
    return this.http.post<InputInterface>(
        this.getUrl(),
        data
    );
  }

  getUrl(): string {
    return this.url;
  }
}
