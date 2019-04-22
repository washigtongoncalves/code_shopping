import { Component, Input } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  @Input()
  product: ProductInterface = {
    name: '',
    description: '',
    price: 0.00,
    active: true
  };
}
