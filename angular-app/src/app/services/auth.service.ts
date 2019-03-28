import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { UserInsertService } from 'src/app/components/pages/user/user-list/user-insert.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

const TOKEN_KEY: string = 'code_shopping_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.api.url}`;
  public me: UserInterface;

  constructor(private http: HttpClient) { 
    const token = this.getToken();
    this.setUserFromToken(token);
  }

  login(user: UserInterface): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.api}/login`, user)
      .pipe(
          tap(response => {
            this.setToken(response.token);
          })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post<any>(`${this.api}/logout`, {})
      .pipe(
          tap(() => {
            this.setToken(null);
          })
      );
  }

  setToken(token: string) {
    this.setUserFromToken(token);
    token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuth(): boolean {
    const token = this.getToken();
    return !(new JwtHelperService().isTokenExpired(token, 30));
  }

  private setUserFromToken(token: string) {
    const decodedPayload = new JwtHelperService().decodeToken(token);
    this.me = decodedPayload ? { 
      id: decodedPayload.sub, 
      name: decodedPayload.name,
      email: decodedPayload.email
    } : null;
  }
}
