import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInputHttpService } from '../../../../services/http/product-input-http.service';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { ProductInputInterface } from '../../../../interfaces/product-input.interface';
import { InputInterface } from '../../../../interfaces/input.interface';
import { ProductInputNewModalComponent } from '../product-input-new-modal/product-input-new-modal.component';

@Component({
  selector: 'product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.css']
})
export class ProductInputListComponent implements OnInit {

  productId: number;
  product: ProductInterface;
  inputs: Array<InputInterface> = [];
  // public pagination = {
  //  currentPage: 1,
  //  totalItems: 0,
  //  itemsPerPage: 15
  // };

  @ViewChild(ProductInputNewModalComponent)
  productNewModal: ProductInputNewModalComponent;

  constructor(
    private route: ActivatedRoute,
    private productInputHttp: ProductInputHttpService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params.product;
      this.getProductInputs();
    });
  }

  // pageChange(page: number) {
  //  this.pagination.currentPage = page;
  //  this.getProductInputs();
  // }

  getProductInputs() {
    this.productInputHttp
        .list(this.productId)
        .subscribe(response => { 
          this.product = response.product;
          this.inputs  = response.inputs; 
        });
  }
}
