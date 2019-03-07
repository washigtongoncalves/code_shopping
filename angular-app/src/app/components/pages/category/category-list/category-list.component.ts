import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Necessário para o Typescript não exibir erro na hora de compilar,
// pois ele não conhece a variável do jQuery por padrão
declare let $;

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
  private token: string;
  public categories: Array<iCategory> = [];
  public category = {
      name: ''  
  };
  
  constructor(private http: HttpClient) { }
  
  ngOnInit()
  {
      this.token = localStorage.getItem('token');
      this.getCategories();
  }
  
  public getCategories()
  {
      const token = this.token;  
      this.http
          .get<{data: Array<iCategory>}>(this.api + '/categories', {
              headers : {
                 'Authorization' : `Bearer ${token}`
              }
          })
          .subscribe((response) => {
              this.categories = response.data;
          });
  }
  
  submit()
  {
      const token = this.token;
      this.http
          .post(this.api + '/categories', this.category, {
              headers : {
                 'Authorization' : `Bearer ${token}`
              }
          })
          .subscribe(() => {
              this.getCategories();
              $("#exampleModal").modal('hide');
          });
  }
}
