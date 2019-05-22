import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import fieldsOptions from '../product-form/product-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent {

  public form: FormGroup;

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
        this.reset();
    };
    const error = (responseError) => {
      if (responseError.status === 422) {
        this.errors = responseError.error.errors;
      }
      this.onError.emit(responseError);
    };
    this.productHttp
        .create(this.form.value)
        .subscribe(success, error);
  }

  reset() {
    this.form.reset({
      name: '',
      description: '',
      price: 0.00,
      active : true
    });
  }

  showErrors() {
    return Object.keys(this.errors).length > 0;
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
