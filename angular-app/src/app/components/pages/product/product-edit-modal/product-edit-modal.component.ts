import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import fieldsOptions from '../product-form/product-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent {

  public form: FormGroup;
  private productId: number;

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
    private productHttp: ProductHttpService,
    private formBuilder: FormBuilder
  ) {
    const maxlength: number = fieldsOptions.name.validationMessage.maxlength;
    this.form = new FormBuilder().group({
      name: ['', [Validators.required, Validators.maxLength(maxlength)]],
      description: ['', [Validators.required]],
      price: 0.00,
      active: true
    });
  }

  submit() {
    const success = (product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
    };
    const error = (responseError) => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors;
      }
      this.onError.emit(responseError);
    };
    this.productHttp
        .update(this.productId, this.form.value)
        .subscribe(success, error);
  }

  showModal(product: ProductInterface) {
    this.productId = product.id;
    this.form.patchValue(product);
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  showErrors() {
    return Object.keys(this.errors).length > 0;
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
