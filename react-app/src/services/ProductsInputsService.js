import api from './api';

class ProductsInputsService {

    static list(params) {
        let url = '/inputs?page=' + (params.page ? params.page : 1);
        if (params.sort && params.sort.column) {
            const order = params.sort.order && params.sort.order === 'DESC' ? '-' : '+'; 
            url += `&sort=${order}${params.sort.column}`;
        }
        if (params.search) {
            url += `&search=${params.search}`;
        }
        return api.get(url);
    }
}
export default ProductsInputsService;
