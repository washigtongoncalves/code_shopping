import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  private credentials = {
      email : '',
      password : ''
  }
  
  constructor() { }

  ngOnInit() {}
  
  public submit()
  {
      console.log(this.credentials);
      return false;
  }
}
