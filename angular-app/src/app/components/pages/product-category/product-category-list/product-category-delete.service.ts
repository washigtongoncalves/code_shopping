import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { ProductCategoryListComponent } from './product-category-list.component';
import { ProductInterface } from '../../../../interfaces/product.interface';
import { CategoryInterface } from '../../../../interfaces/category.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryDeleteService {

    // tslint:disable-next-line:variable-name
    private _productCategoryLinkComponent: ProductCategoryListComponent;

    constructor(private notify: NotifyMessageService) { }

    set productCategoryListComponent(value: ProductCategoryListComponent) {
        this._productCategoryLinkComponent = value;
    }

    showModalDelete(product: ProductInterface, category: CategoryInterface) {
        this._productCategoryLinkComponent.productCategoryDeleteModal.showModal(product, category);
    }

    hideModalDelete() {
        this._productCategoryLinkComponent.productCategoryDeleteModal.hideModal();
    }

    onDeleteSuccess($event: Event) {
        this._productCategoryLinkComponent.getProductCategories();
        this.hideModalDelete();
        this.notify.success('Sucesso ao desvincular a categoria ao produto!');
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao tentar desvincular a categoria ao produto!');
    }
}
