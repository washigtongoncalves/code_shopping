import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductCategoryInterface } from '../../../../interfaces/product-category.interface';
import { ProductCategoryHttpService } from '../../../../services/http/product-category-http.service';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { CategoryInterface } from '../../../../interfaces/category.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-category-link-modal',
  templateUrl: './product-category-link-modal.component.html',
  styleUrls: ['./product-category-link-modal.component.css']
})
export class ProductCategoryLinkModalComponent implements OnInit {

  private productCategories: ProductCategoryInterface;
  categories: Array<CategoryInterface>;
  categoriesIds: Array<number>;

  @ViewChild(ModalComponent)
  private modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(
    private producCategorytHttp: ProductCategoryHttpService,
    private categoryHttp: CategoryHttpService
  ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryHttp
        .list(1)
        .subscribe(response => this.categories = response.data);
  }

  submit() {
    // const success = (category) => {
    //    this.onSuccess.emit(category);
    //    this.modal.hide();
    // };
    // const error = (err) => this.onError.emit(err);
    // this.productHttp
    //    .restore(this.product.id)
    //    .subscribe(success, error);
  }

  showModal(productCategories: ProductCategoryInterface) {
    this.productCategories = productCategories;
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
