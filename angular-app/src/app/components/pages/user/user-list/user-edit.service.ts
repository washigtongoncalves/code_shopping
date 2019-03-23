import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInterface } from '../../../../interfaces/user.interface';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})
export class UserEditService {

    // tslint:disable-next-line:variable-name
    private _userListComponent: UserListComponent;

    constructor(private notify: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalEdit(user: UserInterface) {
        this._userListComponent.userEditModal.showModal(user);
    }

    hideModalEdit() {
        this._userListComponent.userEditModal.hideModal();
    }

    onEditSuccess($event: Event) {
        this._userListComponent.getUsers();
        this.hideModalEdit();
        this.notify.success('Usuário atualizado com sucesso!');
    }

    onEditError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao atualizar os dados do usuário!');
    }
}
