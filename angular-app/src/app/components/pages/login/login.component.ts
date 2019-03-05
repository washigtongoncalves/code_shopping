import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{ 
  private credentials = {
      email : '',
      password : ''
  };
  private api = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) { }
  ngOnInit() {}
  
  public submit()
  {
      this.http
          .post(this.api + '/login', this.credentials)
          .subscribe((data) => console.log(data));
      return false;
  }
}
