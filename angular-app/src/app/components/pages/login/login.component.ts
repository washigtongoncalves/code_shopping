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
      email : 'admin@user.com',
      password : 'secret'
  };
  private api = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) { }
  ngOnInit() {}
  
  public submit()
  {
      this.http
          .post<any>(this.api + '/login', this.credentials)
          .subscribe((data) => { 
            const token = data.token;
            this.http
                .get<any>(this.api + '/categories', {
                    headers : {
                       'Authorization' : `Bearer ${token}`
                    }
                })
                .subscribe((data) => console.log(data));
          });
      return false;
  }
}
