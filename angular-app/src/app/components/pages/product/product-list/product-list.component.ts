import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductNewModalComponent } from '../product-new-modal/product-new-modal.component';
// import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductInsertService } from './product-insert.service';
// import { ProductEditService } from './product-edit.service';
import { ProductDeleteService } from './product-delete.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Array<ProductInterface> = [];
  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 15
  };

  @ViewChild(ProductNewModalComponent)
  productNewModal: ProductNewModalComponent;

  // @ViewChild(ProductEditModalComponent)
  // productEditModal: ProductEditModalComponent;

  @ViewChild(ProductDeleteModalComponent)
  productDeleteModal: ProductDeleteModalComponent;

  constructor(
    private productHttp: ProductHttpService,
    protected productInsertService: ProductInsertService,
    // protected productEditService: ProductEditService,
    protected productDeleteService: ProductDeleteService
  ) {
    this.productInsertService.productListComponent = this;
    // this.productEditService.productListComponent = this;
    this.productDeleteService.productListComponent = this;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productHttp
        .list(this.pagination.currentPage)
        .subscribe((response) => {
            this.products = response.data;
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
  }

  pageChange(page: number) {
    this.pagination.currentPage = page;
    this.getProducts();
  }
}
