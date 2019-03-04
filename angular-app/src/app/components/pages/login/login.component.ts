import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  protected email : String = 'admin@user.com';

  constructor() { }

  ngOnInit() {}
  
  public meClicou($event: MouseEvent)
  {
      console.log($event);
  }
  
  public digitou($event: KeyboardEvent) 
  {
      console.log($event.key);
  }
}
