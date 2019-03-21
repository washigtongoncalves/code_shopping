import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-restore-modal',
  templateUrl: './product-restore-modal.component.html',
  styleUrls: ['./product-restore-modal.component.css']
})
export class ProductRestoreModalComponent {

  private product: ProductInterface = {
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

  constructor(private productHttp: ProductHttpService) { }

  submit() {
    const success = (category) => {
        this.onSuccess.emit(category);
        this.modal.hide();
    };
    const error = (err) => this.onError.emit(err);
    this.productHttp
        .restore(this.product.id)
        .subscribe(success, error);
  }

  showModal(product: ProductInterface) {
    this.product.id = product.id;
    this.product.name = product.name;
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
