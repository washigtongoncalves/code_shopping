import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'list-error',
  templateUrl: './list-error.component.html',
  styleUrls: ['./list-error.component.css']
})
export class ListErrorComponent {

  @Input()
  errors: {};

  get errorsKeys() {
    return Object.keys(this.errors);
  }

}
