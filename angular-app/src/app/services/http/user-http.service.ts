import { Injectable } from '@angular/core';
import { HttpResourceAbstract } from './http-resource.abstract';
import { UserInterface } from '../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends HttpResourceAbstract<UserInterface> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
    this.url += '/users';
  }
}
