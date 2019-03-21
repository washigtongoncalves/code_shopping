import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductListComponent } from './product-list.component';
import { ProductInterface } from 'src/app/interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class ProductRestoreService {

    // tslint:disable-next-line:variable-name
    private _productListComponent: ProductListComponent;

    constructor(private notify: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalRestore(product: ProductInterface) {
        this._productListComponent.productRestoreModal.showModal(product);
    }

    hideModalRestore() {
        this._productListComponent.productRestoreModal.hideModal();
    }

    onRestoreSuccess($event: Event) {
        this._productListComponent.getProducts();
        this.hideModalRestore();
        this.notify.success('Produto restaurado com sucesso!');
    }

    onRestoreError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao restaurar o produto!');
    }
}
