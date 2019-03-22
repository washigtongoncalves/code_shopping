import { Injectable } from '@angular/core';
import { HttpResourceAbstract } from './http-resource.abstract';
import { UserInterface } from '../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends HttpResourceAbstract<UserInterface> {
  constructor(http: HttpClient) {
    super(http);
    this.url += 'users';
  }
}
