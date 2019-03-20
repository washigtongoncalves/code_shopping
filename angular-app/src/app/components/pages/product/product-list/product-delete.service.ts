import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { ProductListComponent } from './product-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductDeleteService {

    // tslint:disable-next-line:variable-name
    private _productListComponent: ProductListComponent;

    constructor(private notify: NotifyMessageService) { }

    set productListComponent(value: ProductListComponent) {
        this._productListComponent = value;
    }

    showModalDelete(product: ProductInterface) {
        this._productListComponent.productDeleteModal.showModal(product);
    }

    hideModalDelete() {
        this._productListComponent.productDeleteModal.hideModal();
    }

    onDeleteSuccess($event: Event) {
        this._productListComponent.getProducts();
        this.hideModalDelete();
        this.notify.success('Produto excluído com sucesso!');
    }

    onDeleteError($event: HttpErrorResponse) {
        this.notify.error('Ocorreu um erro ao tentar excluir o produto!');
    }
}
