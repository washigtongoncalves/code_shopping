import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductListComponent } from './product-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductEditService {

    // tslint:disable-next-line:variable-name
    private _productListComponent: ProductListComponent;

    constructor(private notify: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalEdit(product: ProductInterface) {
        this._productListComponent.productEditModal.showModal(product);
    }

    hideModalEdit() {
        this._productListComponent.productEditModal.hideModal();
    }

    onEditSuccess($event: Event) {
        this._productListComponent.getProducts();
        this.hideModalEdit();
        this.notify.success('Produto atualizado com sucesso!');
    }

    onEditError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao editar o produto!');
    }
}
