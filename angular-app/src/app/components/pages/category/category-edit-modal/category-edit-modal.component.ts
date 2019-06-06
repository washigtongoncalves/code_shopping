import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import fieldsOptions from '../category-form/category-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent {

  public form: FormGroup;
  private categoryId: number;

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
    private categoryHttp: CategoryHttpService
  ) {
    this.form = new FormBuilder().group({
      name: ['', [
        Validators.required,
        Validators.minLength(fieldsOptions.name.validationMessage.minlength),
        Validators.maxLength(fieldsOptions.name.validationMessage.maxlength)
      ]],
      active: true
    });
  }

  submit() {
    const success = (category) => {
        this.onSuccess.emit(category);
        this.modal.hide();
    };
    const error = (responseError) => {
        if (responseError.status === 422) {
          this.errors = responseError.error.errors;
        }
        this.onError.emit(responseError);
    };
    this.categoryHttp
        .update(this.categoryId, this.form.value)
        .subscribe(success, error);
  }

  showErrors() {
    return Object.keys(this.errors).length > 0;
  }

  showModal(category: CategoryInterface) {
    this.categoryId = category.id;
    this.form.patchValue(category);
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
