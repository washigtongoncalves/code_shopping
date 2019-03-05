import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface iCategory 
{
    id: number,
    name: string,
    active: boolean,
    created_at: { date: string }
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit
{
  private api = 'http://localhost:8000/api';
  public categories: Array<iCategory> = [];
  
  constructor(private http: HttpClient) { }
  
  ngOnInit()
  {
      this.getCategories();
  }
  
  public getCategories()
  {
    const token = localStorage.getItem('token');
    this.http
        .get<{data: Array<iCategory>}>(this.api + '/categories', {
            headers : {
               'Authorization' : `Bearer ${token}`
            }
        })
        .subscribe((response) => {
//            response.data[0].active = false;
//            response.data[2].active = false;
            this.categories = response.data;
        });
  }
}
