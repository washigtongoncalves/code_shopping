import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent {

  // tslint:disable-next-line:no-input-rename
  @Input('show-btn-close')
  showBtnClose = true;

  // tslint:disable-next-line:no-input-rename
  @Input('show-icon')
  showIcon = true;

  @Output()
  showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  // tslint:disable-next-line:variable-name
  _show = false;

  constructor() { }

  @Input()
  set show(value: boolean) {
    this._show = value;
    this.showChange.emit(value);
  }

  hide() {
    this.show = false;
  }
}
