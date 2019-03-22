import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryHttpService } from 'src/app/services/http/product-category-http.service';
import { ProductCategoryLinkModalComponent } from '../product-category-link-modal/product-category-link-modal.component';
import { ProductCategoryDeleteModalComponent } from '../product-category-delete-modal/product-category-delete-modal.component';
import { ProductCategoryLinkService } from './product-category-link.service';
import { ProductCategoryDeleteService } from './product-category-delete.service';
import { ProductCategoryInterface } from '../../../../interfaces/product-category.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number;
  productCategories: ProductCategoryInterface;

  @ViewChild(ProductCategoryLinkModalComponent)
  productCategoryLinkModal: ProductCategoryLinkModalComponent;

  @ViewChild(ProductCategoryDeleteModalComponent)
  productCategoryDeleteModal: ProductCategoryDeleteModalComponent;

  constructor(
    private route: ActivatedRoute,
    private productCategoryHttp: ProductCategoryHttpService,
    private productCategoryLinkService: ProductCategoryLinkService,
    private productCategoryDeleteService: ProductCategoryDeleteService
  ) {
    this.productCategoryLinkService.productCategoryListComponent = this;
    this.productCategoryDeleteService.productCategoryListComponent = this;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getProductCategories();
    });
  }

  getProductCategories() {
    this.productCategoryHttp
        .list(this.productId)
        .subscribe(response => this.productCategories = response);
  }
}
