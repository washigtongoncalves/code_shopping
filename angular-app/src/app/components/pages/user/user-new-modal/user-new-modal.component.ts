import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from 'src/app/services/http/user-http.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent {

  public user: UserInterface = {
      name: '',
      email: '',
      password: ''  
  };
  public confirmPassword: string;

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
    const success = (user) => {
        this.onSuccess.emit(user);
        this.modal.hide();
        this.reset();
    };
    const error = (err) => this.onError.emit(err);
    this.userHttp
        .create(this.user)
        .subscribe(success, error);
  }

  reset() {
    this.user = {
        name: '',
        email: '',
        password: ''
    };
    this.confirmPassword = '';
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
