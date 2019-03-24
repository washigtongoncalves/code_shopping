import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { UserInsertService } from 'src/app/components/pages/user/user-list/user-insert.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY: string = 'code_shopping_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8000/api/login';
  me: UserInterface;

  constructor(private http: HttpClient) { 
    const token = this.getToken();
    this.setUserFromToken(token);
  }

  login(user: UserInsertService): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(this.api, user)
      .pipe(
          tap(response => {
            this.setToken(response.token);
          })
      );
  }

  setToken(token: string) {
    this.setUserFromToken(token);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
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
