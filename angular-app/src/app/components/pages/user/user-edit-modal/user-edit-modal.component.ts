import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent {

  public user: UserInterface = {
    id: null,
    name: '',
    email: '',
    password: ''
  };

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private userHttp: UserHttpService) { }

  submit() {
    if (this.user.password === '') {
      delete this.user.password;
    }
    const success = (user) => {
        this.onSuccess.emit(user);
        this.modal.hide();
    };
    const error = (err) => this.onError.emit(err);
    this.userHttp
        .update(this.user.id, this.user)
        .subscribe(success, error);
    this.reset();
  }

  reset() {
    this.user = {
      id: null,
      name: '',
      email: '',
      password: ''
    };
  }

  showModal(user: UserInterface) {
    this.user.id = user.id;
    this.user.name = user.name;
    this.user.email = user.email;
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
