import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { UserListComponent } from './user-list.component';

@Injectable({
    providedIn: 'root'
})
export class UserInsertService {

    // tslint:disable-next-line:variable-name
    private _userListComponent: UserListComponent;

    constructor(private notify: NotifyMessageService) { }

    set userListComponent(value: UserListComponent) {
        this._userListComponent = value;
    }

    showModalInsert() {
        this._userListComponent.userNewModal.showModal();
    }

    hideModalInsert() {
        this._userListComponent.userNewModal.hideModal();
    }

    onInsertSuccess($event: Event) {
        this._userListComponent.getUsers();
        this.hideModalInsert();
        this.notify.success('Usuário cadastrado com sucesso!');
    }

    onInsertError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao cadastrar o usuário!');
    }
}
