import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent {

  private product: ProductInterface;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productHttp: ProductHttpService) { }

  destroy() {
    const success = () => {
        this.onSuccess.emit();
        this.modal.hide();
    };
    const error = (err) => this.onError.emit(err);
    this.productHttp
        .destroy(this.product.id)
        .subscribe(success, error);
  }

  showModal(product: ProductInterface) {
    this.product = product;
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
