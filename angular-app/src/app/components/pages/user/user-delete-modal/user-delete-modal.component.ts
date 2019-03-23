import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent {

  private user: UserInterface;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private userHttp: UserHttpService) { }

  destroy() {
      const success = () => {
          this.onSuccess.emit();
          this.modal.hide();
      };
      const error = (err) => this.onError.emit(err);
      this.userHttp
          .destroy(this.user.id)
          .subscribe(success, error);
  }

  showModal(user: UserInterface) {
      this.user = user;
      this.modal.show();
  }

  hideModal() {
      this.modal.hide();
  }
}
