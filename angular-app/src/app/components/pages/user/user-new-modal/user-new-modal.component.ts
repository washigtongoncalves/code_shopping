import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import fieldsOptions from '../user-form/user-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent {

  public form: FormGroup;

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
    const maxlength: number = fieldsOptions.name.validationMessage.maxlength;
    const minlength: number = fieldsOptions.name.validationMessage.minlength;
    this.form = new FormBuilder().group({
      name:  ['', [Validators.required, Validators.maxLength(maxlength), Validators.minLength(minlength)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(fieldsOptions.password.validationMessage.minlength)]]
    });
  }

  submit() {
    const success = (user) => {
        this.onSuccess.emit(user);
        this.modal.hide();
        this.reset();
    };
    const error = (responseError) => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors;
      }
      this.onError.emit(responseError);
    };
    this.userHttp
        .create(this.form.value)
        .subscribe(success, error);
  }

  reset() {
    this.form.reset({
        name: '',
        email: '',
        password: ''
    });
  }

  showErrors() {
    return Object.keys(this.errors).length > 0;
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
