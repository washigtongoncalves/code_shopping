import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDeleteModalComponent } from '../user-delete-modal/user-delete-modal.component';
import { UserDeleteService } from './user-delete.service';
import { UserHttpService } from '../../../../services/http/user-http.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(UserDeleteModalComponent)
  userDeleteModal: UserDeleteModalComponent;

  public users: Array<UserInterface> = [];
  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 15
  };
  public trashed: boolean;

  constructor(
    private userHttp: UserHttpService,
    protected userDeleteService: UserDeleteService
  ) { 
    this.userDeleteService.userListComponent = this;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userHttp
        .list({ page: this.pagination.currentPage, trashed: this.trashed })
        .subscribe((response) => {
            this.users = response.data;
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
  }

  pageChange(page: number) {
    this.pagination.currentPage = page;
    this.getUsers();
  }
}