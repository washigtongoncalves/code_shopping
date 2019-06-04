import { Injectable, ElementRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

declare const $;

@Injectable({
  providedIn: 'root'
})
export class ProductIdFieldService {

    data: Array<any>;
    options: Select2Options;
    select2Element: ElementRef;

    constructor(private authService: AuthService) {}

    get divModal() {
        const modalElement = this.select2Native.closest('modal');
        return modalElement.firstChild;
    }

    get select2Native(): HTMLElement {
        return this.select2Element.nativeElement;
    }

    make(select2Element: ElementRef) {
        this.select2Element = select2Element;
        this.options = {
            minimumInputLength: 3,
            dropdownParent: $(this.divModal),
            theme: 'bootstrap4',
            ajax: {
                headers: { // Adicionar o header de autenticação no Ajax do jQuery
                    Authorization: this.authService.authorizationHeader
                },
                url: `${environment.api.url}/products`,
                data(params) { // Adiciona o ?search=
                    return {
                        search: params.term
                    };
                },
                processResults(data) { // Converte o resultado do Ajax para o padrão do Select2
                    return {
                        results: data.data.map((product) => {
                            return {
                                id: product.id,
                                text: product.name
                            };
                        })
                    };
                }
            }
        };
    }
}
