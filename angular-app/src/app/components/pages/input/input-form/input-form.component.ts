import { Component, Input, ChangeDetectorRef, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Select2Component } from 'ng2-select2';
import fieldsOptions from './input-fields-options';
import { ProductIdFieldService } from './product-id-field.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  @Input()
  public form: FormGroup;

  @ViewChild(Select2Component, { read: ElementRef })
  select2Element: ElementRef;

  constructor(
    private changeRef: ChangeDetectorRef,
    public productIdFieldService: ProductIdFieldService
  ) {}

  ngOnInit() {
    this.productIdFieldService.make(this.select2Element);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(): any {
    return fieldsOptions;
  }
}
