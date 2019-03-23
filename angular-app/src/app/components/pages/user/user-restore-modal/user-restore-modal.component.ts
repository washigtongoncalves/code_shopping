import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInterface } from '../../../../interfaces/user.interface';
import { UserHttpService } from '../../../../services/http/user-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-restore-modal',
  templateUrl: './user-restore-modal.component.html',
  styleUrls: ['./user-restore-modal.component.css']
})
export class UserRestoreModalComponent {

  private user: UserInterface = {
    id: null,
    name: ''
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
    const success = (user) => {
        this.onSuccess.emit(user);
        this.modal.hide();
    };
    const error = (err) => this.onError.emit(err);
    this.userHttp
        .restore(this.user.id)
        .subscribe(success, error);
  }

  showModal(user: UserInterface) {
    this.user.id = user.id;
    this.user.name = user.name;
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
