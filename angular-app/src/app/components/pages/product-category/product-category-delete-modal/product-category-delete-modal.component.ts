import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { ProductCategoryHttpService } from '../../../../services/http/product-category-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-category-delete-modal',
  templateUrl: './product-category-delete-modal.component.html',
  styleUrls: ['./product-category-delete-modal.component.css']
})
export class ProductCategoryDeleteModalComponent {

  private product: ProductInterface;
  private category: CategoryInterface;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private productCategoryHttp: ProductCategoryHttpService) { }

  destroy() {
    const success = () => {
        this.onSuccess.emit();
        this.modal.hide();
    };
    const error = (err) => this.onError.emit(err);
    this.productCategoryHttp
        .destroy(this.product.id, this.category.id)
        .subscribe(success, error);
  }

  showModal(product: ProductInterface, category: CategoryInterface) {
    this.product  = product;
    this.category = category;
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
