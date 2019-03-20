import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent {

  private product: ProductInterface = {
    name: '',
    description: '',
    price: 0.00,
    active: true
  };

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productHttp: ProductHttpService) { }

  submit() {
    const success = (category) => {
        this.onSuccess.emit(category);
        this.modal.hide();
    };
    const error = (err) => this.onError.emit(err);
    this.productHttp
        .update(this.product)
        .subscribe(success, error);
  }

  showModal(product: ProductInterface) {
    this.product.id = product.id;
    this.product.name = product.name;
    this.product.description = product.description;
    this.product.price  = product.price;
    this.product.active = product.active;
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  // Eventos do componente de Modal
  onShowModal($event: Event) {
    console.log('Show Edit Modal Event');
    console.log($event);
  }

  onShownModal($event: Event) {
    console.log('Shown Edit Modal Event');
    console.log($event);
  }

  onHiddenModal($event: Event) {
    console.log('Hidden Edit Modal Event');
    console.log($event);
  }

  onHideModal($event: Event) {
    console.log('Hide Edit Modal Event');
    console.log($event);
  }
}
