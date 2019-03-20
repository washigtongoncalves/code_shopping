import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private credentials = {
      email : 'admin@user.com',
      password : 'secret'
  };
  private api = 'http://localhost:8000/api';
  public showMessageError = false;

  constructor(private http: HttpClient, private router: Router) { }

  public submit() {
    this.http
        .post<any>(this.api + '/login', this.credentials)
        .subscribe((data) => {
            localStorage.setItem('token', data.token);
            this.router.navigate(['categories/list']);
        },
        (response) => this.showMessageError = true
        );
    return false;
  }
}
