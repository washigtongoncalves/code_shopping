import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  login(user: {email: string, password: string}): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.api + '/login', user);
  }
}
