import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { AuthService } from 'src/app/services/auth.service';
import fieldsOptions from '../user-form/user-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  public form: FormGroup;
  private userId: number;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  errors = {};

  constructor(
    private authService: AuthService,
    private userHttp: UserHttpService
  ) {
    this.userId = this.authService.me.id;
    const maxlength: number = fieldsOptions.name.validationMessage.maxlength;
    this.form = new FormBuilder().group({
      name:  ['', [Validators.required, Validators.maxLength(maxlength)]],
      email: ['', [Validators.required, Validators.email]],
      password: ''
    });
    this.form.patchValue(this.authService.me);
  }

  submit() {
    const success = (user) => {
        this.onSuccess.emit(user);
        this.authService.me = user;
    };
    const error = (responseError) => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors;
      }
      this.onError.emit(responseError);
    };
    this.userHttp
        .update(this.userId, this.form.value)
        .subscribe(success, error);
  }

  showErrors() {
    return Object.keys(this.errors).length > 0;
  }
}
