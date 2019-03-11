import {Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';

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
  public category = { name: '' };
  
  @ViewChild(ModalComponent)
  private modal: ModalComponent;
  
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
              this.modal.hide();
          });
  }
  
  hideModal($event: Event)
  {
      console.log($event);
  }
  
  showModal()
  {
      this.modal.show();
  }
}
