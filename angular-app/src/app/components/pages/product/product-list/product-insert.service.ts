import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductListComponent } from './product-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductInsertService {

    private _productListComponent: ProductListComponent;

    constructor(private notify: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalInsert() {
        this._productListComponent.productNewModal.showModal();
    }

    hideModalInsert() {
        this._productListComponent.productNewModal.hideModal();
    }

    onInsertSuccess($event: Event) {
        this._productListComponent.getProducts();
        this.hideModalInsert();
        this.notify.success('Produto cadastrado com sucesso!');
    }

    onInsertError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao cadastrar o produto!');
    }
}
