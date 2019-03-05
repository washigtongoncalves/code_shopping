import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit
{
  private api = 'http://localhost:8000/api';
  public categories: Array<any> = [];
  
  constructor(private http: HttpClient) { }
  
  ngOnInit()
  {
      this.getCategories();
  }
  
  public getCategories()
  {
    const token = localStorage.getItem('token');
    this.http
        .get<Array<any>>(this.api + '/categories', {
            headers : {
               'Authorization' : `Bearer ${token}`
            }
        })
        .subscribe((data) => this.categories = data);
  }
}
