import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryNewModalComponent } from '../category-new-modal/category-new-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { CategoryInsertService } from './category-insert.service';
import { CategoryEditService } from './category-edit.service';
import { CategoryDeleteService } from './category-delete.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  sortColumn = { column: '', sort: ''};

  public categories: Array<CategoryInterface> = [];

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;

  public pagination = {
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 15
  };

  constructor(
      private categoryHttp: CategoryHttpService,
      protected categoryInsertService: CategoryInsertService,
      protected categoryEditService: CategoryEditService,
      protected categoryDeleteService: CategoryDeleteService,
  ) {
    this.categoryInsertService.categoryListComponent = this;
    this.categoryEditService.categoryListComponent = this;
    this.categoryDeleteService.categoryListComponent = this;
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryHttp
        .list({ page: this.pagination.currentPage, sortColumn: this.sortColumn })
        .subscribe((response) => {
            this.categories = response.data;
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
  }

  pageChange(page: number) {
    this.pagination.currentPage = page;
    this.getCategories();
  }

  sortChange() {
    this.getCategories();
  }
}
