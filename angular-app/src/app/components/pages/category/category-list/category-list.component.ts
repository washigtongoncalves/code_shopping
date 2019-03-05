import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent 
{
  private api = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) { }
}
