import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { CategoryInterface } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit
{
  public categories: Array<CategoryInterface> = [];
  
  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;
  
  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;
  
  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;
  
  constructor(private categoryHttp: CategoryHttpService) { }
  
  ngOnInit()
  {
      this.getCategories();
  }
  
  getCategories()
  {
      this.categoryHttp
          .list()
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
  
  showModalEdit(category: CategoryInterface)
  {
      this.categoryEditModal.showModal(category);
  }
  
  hideModalEdit()
  {
      this.categoryEditModal.hideModal();
  }
  
  showModalDelete(category: CategoryInterface)
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
