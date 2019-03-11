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
  
  showModal()
  {
      this.modal.show();
  }
  
  // Eventos do componente de Modal
  onShowModal($event: Event)
  {
      console.log('Show Modal Event');
      console.log($event);
  }
  
  onShownModal($event: Event)
  {
      console.log('Shown Modal Event');
      console.log($event);
  }
  
  onHiddenModal($event: Event)
  {
      console.log('Hidden Modal Event');
      console.log($event);
  }
  
  onHideModal($event: Event)
  {
      console.log('Hide Modal Event');
      console.log($event);
  }
}
