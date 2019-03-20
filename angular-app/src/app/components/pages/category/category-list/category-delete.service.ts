import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { CategoryListComponent } from './category-list.component';

@Injectable({
    providedIn: 'root'
})
export class CategoryDeleteService {

    // tslint:disable-next-line:variable-name
    private _categoryListComponent: CategoryListComponent;

    constructor(private notify: NotifyMessageService) { }

    set categoryListComponent(value: CategoryListComponent) {
        this._categoryListComponent = value;
    }

    showModalDelete(category: CategoryInterface) {
        this._categoryListComponent.categoryDeleteModal.showModal(category);
    }

    hideModalDelete() {
        this._categoryListComponent.categoryDeleteModal.hideModal();
    }

    onDeleteSuccess($event: Event) {
        this._categoryListComponent.getCategories();
        this.hideModalDelete();
        this.notify.success('Categoria excluída com sucesso!');
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao tentar excluir a categoria!');
    }
}
