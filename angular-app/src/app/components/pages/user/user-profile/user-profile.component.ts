import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyMessageService } from '../../../../services/notify-message.service';
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
  errors = {};

  constructor(
    private authService: AuthService,
    private userHttp: UserHttpService,
    private notify: NotifyMessageService
  ) {
    this.userId = this.authService.me.id;
    const maxlength: number = fieldsOptions.name.validationMessage.maxlength;
    this.form = new FormBuilder().group({
      name:  ['', [Validators.required, Validators.maxLength(maxlength)]],
      email: '',
      password: ''
    });
    this.form.patchValue(this.authService.me);
  }

  submit() {
    const success = (u) => {
        this.notify.success('Perfil atualizado com sucesso!');
    };
    const error = (responseError) => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors;
      }
      this.notify.error('Ocorreu um erro ao atualizar o seu perfil!');
    };
    const user = this.form.value;
    if (user.password === '') {
      delete user.password;
    }
    this.userHttp
        .update(this.userId, user)
        .subscribe(success, error);
  }

  showErrors() {
    return Object.keys(this.errors).length > 0;
  }
}
