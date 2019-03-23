import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { UserListComponent } from './user-list.component';
import { UserInterface } from '../../../../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserRestoreService {

    // tslint:disable-next-line:variable-name
    private _userListComponent: UserListComponent;

    constructor(private notify: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalRestore(user: UserInterface) {
        this._userListComponent.userRestoreModal.showModal(user);
    }

    hideModalRestore() {
        this._userListComponent.userRestoreModal.hideModal();
    }

    onRestoreSuccess($event: Event) {
        this._userListComponent.getUsers();
        this.hideModalRestore();
        this.notify.success('Usuário restaurado com sucesso!');
    }

    onRestoreError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao restaurar o usuário!');
    }
}
