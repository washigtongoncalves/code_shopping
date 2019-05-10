import { Component, Input, ChangeDetectorRef  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from './product-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  @Input()
  public form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(): any {
    return fieldsOptions;
  }
}
