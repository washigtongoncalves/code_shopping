import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { ProductCategoryHttpService } from 'src/app/services/http/product-category-http.service';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  selector: 'product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productId: number;
  product: ProductInterface;
  productCategories: Array<CategoryInterface>;
  categories: Array<CategoryInterface>;
  categoriesIds: Array<number> = [];

  constructor(
    private route: ActivatedRoute,
    private productHttp: ProductHttpService,
    private productCategoryHttp: ProductCategoryHttpService,
    private categoryHttp: CategoryHttpService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getProduct();
      this.getCategories();
      this.getProductCategories();
    });
  }

  getProduct() {
    this.productHttp
        .get(this.productId)
        .subscribe(product => this.product = product);
  }

  getCategories() {
    this.categoryHttp
        .list(1)
        .subscribe((response) => this.categories = response.data);
  }

  getProductCategories() {
    this.productCategoryHttp
        .list(this.productId)
        .subscribe(response => this.productCategories = response.categories); 
  }
}
