import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { ProductCategoryListComponent } from './product-category-list.component';
import { ProductCategoryInterface } from '../../../../interfaces/product-category.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryLinkService {

    // tslint:disable-next-line:variable-name
    private _productCategoryLinkComponent: ProductCategoryListComponent;

    constructor(private notify: NotifyMessageService) { }

    set productCategoryListComponent(value: ProductCategoryListComponent) {
        this._productCategoryLinkComponent = value;
    }

    showModalLink(productCategories: ProductCategoryInterface) {
        this._productCategoryLinkComponent.productCategoryLinkModal.showModal(productCategories);
    }

    hideModalLink() {
        this._productCategoryLinkComponent.productCategoryLinkModal.hideModal();
    }

    onLinkSuccess($event: Event) {
        this._productCategoryLinkComponent.getProductCategories();
        this.hideModalLink();
        this.notify.success('Sucesso ao vincular as categorias ao produto!');
    }

    onLinkError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao tentar vincular as categorias ao produto!');
    }
}
