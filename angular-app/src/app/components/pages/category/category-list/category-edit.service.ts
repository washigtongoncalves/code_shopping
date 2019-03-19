import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryInterface } from 'src/app/interfaces/category.interface';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { CategoryListComponent } from './category-list.component';

@Injectable({
    providedIn: 'root'
})
export class CategoryEditService 
{
    private _categoryListComponent: CategoryListComponent;

    constructor(private notify: NotifyMessageService) { }

    set categoryListComponent(value: CategoryListComponent)
    {
        this._categoryListComponent = value;
    }

    showModalEdit(category: CategoryInterface)
    {
        this._categoryListComponent.categoryEditModal.showModal(category);
    }
    
    hideModalEdit()
    {
        this._categoryListComponent.categoryEditModal.hideModal();
    }

    onEditSuccess($event: Event)
    {
        this._categoryListComponent.getCategories();
        this.hideModalEdit();
        this.notify.success('Categoria atualizada com sucesso!');
    }
    
    onEditError($event: HttpErrorResponse)
    {
         this.notify.error('Ocorreu um erro ao editar a categoria!');
    }  
}