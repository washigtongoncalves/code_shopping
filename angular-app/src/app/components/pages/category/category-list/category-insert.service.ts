import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { CategoryListComponent } from './category-list.component';

@Injectable({
    providedIn: 'root'
})
export class CategoryInsertService 
{
    private _categoryListComponent: CategoryListComponent;

    constructor(private notify: NotifyMessageService) { }

    set categoryListComponent(value: CategoryListComponent)
    {
        this._categoryListComponent = value;
    }

    showModalInsert()
    {
        this._categoryListComponent.categoryNewModal.showModal();
    }
    
    hideModalInsert()
    {
        this._categoryListComponent.categoryNewModal.hideModal();
    }

    onInsertSuccess($event: Event)
    {
        this._categoryListComponent.getCategories();
        this.hideModalInsert();
        this.notify.success('Categoria cadastrada com sucesso!');
    }
    
    onInsertError($event: HttpErrorResponse)
    {
        this.notify.error('Ocorreu um erro ao cadastrar a categoria!');
    }
}