import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OutputInterface } from '../../interfaces/output.interface';
import { MetaPaginationInterface } from '../../interfaces/meta-pagination.interface';
import { SearchParamsInterface } from '../../interfaces/search-params.interface';
import { SearchParamsBuilder } from '../../interfaces/search-params-builder.class';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutputHttpService {

  protected url = `${environment.api.url}/outputs`;
  protected http: HttpClient;
  protected authService: AuthService;

  constructor(http: HttpClient, authService: AuthService) {
    this.http = http;
    this.authService = authService;
  }

  list(searchParams: SearchParamsInterface): Observable<{ data: Array<OutputInterface>, meta: MetaPaginationInterface }> {
    const params = new HttpParams({
        fromObject: new SearchParamsBuilder(searchParams).makeObject()
    });
    return this.http.get<{ data: Array<OutputInterface>, meta: MetaPaginationInterface }>(
        this.getUrl(),
        { params }
    );
  }

  create(data: { amount: number, productId: number }): Observable<OutputInterface> {
    return this.http.post<OutputInterface>(
        this.getUrl(),
        data
    );
  }

  getUrl(): string {
    return this.url;
  }
}
