import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

const TOKEN_KEY: string = 'code_shopping_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8000/api/login';

  constructor(private http: HttpClient) { }

  login(user: { email: string, password: string }): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(this.api, user)
      .pipe(
          tap(response => {
            this.setToken(response.token);
          })
      );
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
