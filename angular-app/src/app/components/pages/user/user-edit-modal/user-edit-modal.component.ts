import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import fieldsOptions from '../user-form/user-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent {

  public form: FormGroup;
  private userId: number;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  errors = {};

  constructor(
    private userHttp: UserHttpService
  ) {
    this.form = new FormBuilder().group({
      name:  ['', [
        Validators.required,
        Validators.maxLength(fieldsOptions.name.validationMessage.maxlength),
        Validators.minLength(fieldsOptions.name.validationMessage.minlength)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.minLength(fieldsOptions.password.validationMessage.minlength)
      ]]
    });
  }

  submit() {
    const success = (u) => {
        this.onSuccess.emit(u);
        this.modal.hide();
    };
    const error = (responseError) => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors;
      }
      this.onError.emit(responseError);
    };
    const user = this.form.value;
    if (user.password === '') {
       delete user.password;
    }
    this.userHttp
        .update(this.userId, user)
        .subscribe(success, error);
    this.reset();
  }

  reset() {
    this.form.reset({
      id: null,
      name: '',
      email: '',
      password: ''
    });
  }

  showErrors() {
    return Object.keys(this.errors).length > 0;
  }

  showModal(user: UserInterface) {
    this.userId = user.id;
    this.form.patchValue(user);
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
