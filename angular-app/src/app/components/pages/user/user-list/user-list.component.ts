import { Component, OnInit, ViewChild } from '@angular/core';
import { UserNewModalComponent } from '../user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from '../user-delete-modal/user-delete-modal.component';
import { UserRestoreModalComponent } from '../user-restore-modal/user-restore-modal.component';
import { UserInsertService } from './user-insert.service';
import { UserEditService } from './user-edit.service';
import { UserDeleteService } from './user-delete.service';
import { UserRestoreService } from './user-restore.service';
import { UserHttpService } from '../../../../services/http/user-http.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(UserNewModalComponent)
  userNewModal: UserNewModalComponent;

  @ViewChild(UserEditModalComponent)
  userEditModal: UserEditModalComponent;

  @ViewChild(UserDeleteModalComponent)
  userDeleteModal: UserDeleteModalComponent;

  @ViewChild(UserRestoreModalComponent)
  userRestoreModal: UserRestoreModalComponent;

  public users: Array<UserInterface> = [];
  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 15
  };
  public trashed: boolean;

  constructor(
    private userHttp: UserHttpService,
    protected userInsertService: UserInsertService,
    protected userEditService: UserEditService,
    protected userDeleteService: UserDeleteService,
    protected userRestoreService: UserRestoreService
  ) {
    this.userInsertService.userListComponent = this;
    this.userEditService.userListComponent = this; 
    this.userDeleteService.userListComponent = this;
    this.userRestoreService.userListComponent = this;
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
