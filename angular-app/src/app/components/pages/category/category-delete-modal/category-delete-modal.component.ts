import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent {

  private category: CategoryInterface;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService) { }

  destroy() {
      const success = () => {
          this.onSuccess.emit();
          this.modal.hide();
      };
      const error = (err) => this.onError.emit(err);
      this.categoryHttp
          .destroy(this.category.id)
          .subscribe(success, error);
  }

  showModal(category: CategoryInterface) {
      this.category = category;
      this.modal.show();
  }

  hideModal() {
      this.modal.hide();
  }

  // Eventos do componente de Modal
  onShowModal($event: Event) {
      console.log('Show Delete Modal Event');
      console.log($event);
  }

  onShownModal($event: Event) {
      console.log('Shown Delete Modal Event');
      console.log($event);
  }

  onHiddenModal($event: Event) {
      console.log('Hidden Delete Modal Event');
      console.log($event);
  }

  onHideModal($event: Event) {
      console.log('Hide Delete Modal Event');
      console.log($event);
  }
}
