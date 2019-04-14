import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  @Input()
  public form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) {}

  ngOnChanges() {
    this.changeRef.detectChanges();
  }
}
