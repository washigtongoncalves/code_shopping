import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import fieldsOptions from './user-fields-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  @Input()
  public form: FormGroup;

  @Input()
  editMode: boolean;

  constructor(private changeRef: ChangeDetectorRef) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.changeRef.detectChanges();
  }

  get fieldsOptions(): any {
    return fieldsOptions;
  }
}
