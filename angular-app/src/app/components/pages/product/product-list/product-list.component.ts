import { Component, OnInit } from '@angular/core';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { ProductInterface } from 'src/app/interfaces/product.interface';

@Component({
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

  constructor(private productHttp: ProductHttpService, ) { }

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

  pageChange(page: number)
  {
       this.pagination.currentPage = page;
       this.getProducts();
  }
}
