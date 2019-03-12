import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';

interface iCategory 
{
    id: number,
    name: string,
    active?: boolean,
    created_at?: { date: string }
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
  
  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;
  
  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;
  
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
  
  showModalEdit(category: iCategory)
  {
      this.categoryEditModal.showModal(category);
  }
  
  hideModalEdit()
  {
      this.categoryEditModal.hideModal();
  }
  
  showModalDelete(category: iCategory)
  {
      this.categoryDeleteModal.showModal(category);
  }
  
  hideModalDelete()
  {
      this.categoryDeleteModal.hideModal();
  }
  
  onInsertSuccess($event: Event)
  {
      this.getCategories();
      this.hideModalInsert();
      console.log('Insert Success');
      console.log($event);
  }
  
  onInsertError($event: HttpErrorResponse)
  {
      console.log('Insert Error');
      console.log($event);
  }
  
  onEditSuccess($event: Event)
  {
      this.getCategories();
      this.hideModalEdit();
      console.log('Edit Success');
      console.log($event);
  }
  
  onEditError($event: HttpErrorResponse)
  {
      console.log('Edit Error');
      console.log($event);
  }
  
  onDeleteSuccess($event: Event)
  {
      this.getCategories();
      this.hideModalDelete();
      console.log('Delete Success');
      console.log($event);
  }
  
  onDeleteError($event: HttpErrorResponse)
  {
      console.log('Delete Error');
      console.log($event);
  }
}
