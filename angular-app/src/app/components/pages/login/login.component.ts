import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form: FormGroup;
  public showMessageError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormBuilder().group({
      email: ['admin@user.com', [Validators.required, Validators.email]],
      password: ['secret', [Validators.required]]
    });
  }

  public submit(event) {
    const success = (data) => {
      this.router.navigate(['categories/list']);
    };
    const error = (response) => this.showMessageError = true;
    this.authService
        .login(this.form.value)
        .subscribe(success, error);
    return false;
  }
}
