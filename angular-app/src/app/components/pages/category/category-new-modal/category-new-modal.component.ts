import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { CategoryInterface } from 'src/app/interfaces/category.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent {

  public category: CategoryInterface = {
    name: '',
    active : true
  };

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService) { }

  submit() {
    const success = (category) => {
        this.onSuccess.emit(category);
        this.modal.hide();
        this.reset();
    };
    const error = (err) => this.onError.emit(err);
    this.categoryHttp
        .create(this.category)
        .subscribe(success, error);
  }

  reset() {
    this.category = {
        name: '',
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
