import { Injectable } from '@angular/core';
import { InputInterface } from '../../interfaces/input.interface';
import { HttpResourceAbstract } from './http-resource.abstract';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InputHttpService extends HttpResourceAbstract<InputInterface> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
    this.url += '/inputs';
  }
}
