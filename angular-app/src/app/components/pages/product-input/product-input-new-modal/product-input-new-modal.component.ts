import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
// import { ProductHttpService } from 'src/app/services/http/product-http.service';
// import fieldsOptions from '../product-form/product-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-input-new-modal',
  templateUrl: './product-input-new-modal.component.html',
  styleUrls: ['./product-input-new-modal.component.css']
})
export class ProductInputNewModalComponent {

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
    // private productHttp: ProductHttpService
  ) {
    
  }

  submit() {
    
  }

  reset() {
    
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
}
