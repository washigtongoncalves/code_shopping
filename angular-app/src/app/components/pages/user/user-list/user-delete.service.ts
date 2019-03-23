import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})
export class UserDeleteService {

    // tslint:disable-next-line:variable-name
    private _userListComponent: UserListComponent;

    constructor(private notify: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalDelete(user: UserInterface) {
        this._userListComponent.userDeleteModal.showModal(user);
    }

    hideModalDelete() {
        this._userListComponent.userDeleteModal.hideModal();
    }

    onDeleteSuccess($event: Event) {
        this._userListComponent.getUsers();
        this.hideModalDelete();
        this.notify.success('Usuário excluído com sucesso!');
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao tentar excluir o usuário!');
    }
}
