import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private credentials = {
      email: 'admin@user.com',
      password: 'secret'
  };
  public showMessageError = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  public submit(event) {
    const success = (data) => {
      this.router.navigate(['categories/list']);
    };
    const error = (response) => this.showMessageError = true;
    this.authService
        .login(this.credentials)
        .subscribe(success, error);
    return false;
  }
}
