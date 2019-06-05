import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import fieldsOptions from '../category-form/category-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent {

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
    private categoryHttp: CategoryHttpService,
    private formBuilder: FormBuilder
  ) {
    const maxlength: number = fieldsOptions.name.validationMessage.maxlength;
    const minlength: number = fieldsOptions.name.validationMessage.minlength;
    this.form = new FormBuilder().group({
      name: ['', [Validators.required, Validators.maxLength(maxlength), Validators.minLength(minlength)]],
      active : true
    });
  }

  submit() {
    const success = (category) => {
        this.onSuccess.emit(category);
        this.modal.hide();
        this.reset();
    };
    const error = (responseError) => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError);
    };
    this.categoryHttp
        .create(this.form.value)
        .subscribe(success, error);
  }

  reset() {
    this.form.reset({
      name: '',
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
