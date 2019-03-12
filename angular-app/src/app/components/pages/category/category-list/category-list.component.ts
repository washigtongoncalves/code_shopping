import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';

interface iCategory 
{
    id: number,
    name: string,
    active: boolean,
    created_at: { date: string }
}

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit
{
  private api = 'http://localhost:8000/api';
  private token: string;
  public categories: Array<iCategory> = [];
  
  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;
  
  constructor(private http: HttpClient) { }
  
  ngOnInit()
  {
      this.token = localStorage.getItem('token');
      this.getCategories();
  }
  
  getCategories()
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
  
  showModalInsert()
  {
      this.categoryNewModal.showModal();
  }
  
  hideModalInsert()
  {
      this.categoryNewModal.hideModal();
  }
  
  onInsertSuccess($event: Event)
  {
      this.getCategories();
      this.hideModalInsert();
      console.log($event);
  }
  
  onInsertError($event: HttpErrorResponse)
  {
      console.log($event);
  }
}
