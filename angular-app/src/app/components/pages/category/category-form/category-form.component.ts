import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  @Input()
  public form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.changeRef.detectChanges();
  }
}
