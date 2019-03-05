import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent 
{
  @Input('show-btn-close')
  showBtnClose: boolean = true;
  
  @Input('show-icon')
  showIcon: boolean = true;
  
  @Output()
  showChange: EventEmitter<boolean> = new EventEmitter<boolean>();  
  _show: boolean = false;
    
  constructor() { }
  
  @Input()
  set show(value: boolean)
  {
      this._show = value;
      this.showChange.emit(value); 
  }
  
  hide()
  {
      this.show = false;
  }
}
