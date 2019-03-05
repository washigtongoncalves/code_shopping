import { Component, Input } from '@angular/core';

@Component({
  selector: 'alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent 
{
  @Input()
  public show: boolean = false;
  
  @Input('show-btn-close')
  public showBtnClose: boolean = true;
  
  @Input('show-icon')
  public showIcon: boolean = true;
  
  constructor() { }
  
  hide()
  {
      this.show = false;
  }
}
