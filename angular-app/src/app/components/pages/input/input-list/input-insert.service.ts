import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { InputListComponent } from './input-list.component';

@Injectable({
    providedIn: 'root'
})
export class InputInsertService {

    // tslint:disable-next-line:variable-name
    private _inputListComponent: InputListComponent;

    constructor(private notify: NotifyMessageService) { }

    set inputListComponent(value: InputListComponent) {
        this._inputListComponent = value;
    }

    showModalInsert() {
        this._inputListComponent.inputNewModal.showModal();
    }

    hideModalInsert() {
        this._inputListComponent.inputNewModal.hideModal();
    }

    onInsertSuccess($event: Event) {
        this._inputListComponent.getInputs();
        this.hideModalInsert();
        this.notify.success('Entrada de estoque cadastrada com sucesso!');
    }

    onInsertError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao cadastrar a entrada de estoque!');
    }
}
