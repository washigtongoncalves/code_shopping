import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { ProductInterface } from 'src/app/interfaces/product.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent {

  public product: ProductInterface = {
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
        this.reset();
    };
    const error = (err) => this.onError.emit(err);
    this.productHttp
        .create(this.product)
        .subscribe(success, error);
  }

  reset() {
    this.product = {
        name: '',
        description: '',
        price: 0.00,
        active: true
    };
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  // Eventos do componente de Modal
  onShowModal($event: Event) {
    console.log('Show New Modal Event');
    console.log($event);
  }

  onShownModal($event: Event) {
    console.log('Shown New Modal Event');
    console.log($event);
  }

  onHiddenModal($event: Event) {
    console.log('Hidden New Modal Event');
    console.log($event);
  }

  onHideModal($event: Event) {
    console.log('Hide New Modal Event');
    console.log($event);
  }
}
