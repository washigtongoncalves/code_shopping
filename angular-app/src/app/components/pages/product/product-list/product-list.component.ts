import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductNewModalComponent } from '../product-new-modal/product-new-modal.component';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';
import { ProductRestoreModalComponent } from '../product-restore-modal/product-restore-modal.component';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductInsertService } from './product-insert.service';
import { ProductEditService } from './product-edit.service';
import { ProductDeleteService } from './product-delete.service';
import { ProductRestoreService } from './product-restore.service';

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
  public trashed: boolean;

  @ViewChild(ProductNewModalComponent)
  productNewModal: ProductNewModalComponent;

  @ViewChild(ProductEditModalComponent)
  productEditModal: ProductEditModalComponent;

  @ViewChild(ProductDeleteModalComponent)
  productDeleteModal: ProductDeleteModalComponent;

  @ViewChild(ProductRestoreModalComponent)
  productRestoreModal: ProductRestoreModalComponent;

  constructor(
    private productHttp: ProductHttpService,
    protected productInsertService: ProductInsertService,
    protected productEditService: ProductEditService,
    protected productDeleteService: ProductDeleteService,
    protected productRestoreService: ProductRestoreService
  ) {
    this.productInsertService.productListComponent = this;
    this.productEditService.productListComponent = this;
    this.productDeleteService.productListComponent = this;
    this.productRestoreService.productListComponent = this;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productHttp
        .list({ page: this.pagination.currentPage, trashed: this.trashed })
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
