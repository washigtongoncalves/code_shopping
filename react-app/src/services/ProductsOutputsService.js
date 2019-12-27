import api from './api';

class ProductsOutputsService {

    static list(params) {
        let url = '/outputs?page=' + (params.page ? params.page : 1);
        if (params.sort && params.sort.column) {
            const order = params.sort.order && params.sort.order === 'DESC' ? '-' : '+'; 
            url += `&sort=${order}${params.sort.column}`;
        }
        if (params.search) {
            url += `&search=${params.search}`;
        }
        return api.get(url);
    }

    static store(productId, data) {
        let url = `/products/${productId}/outputs`;
        return api.post(url, data);
    }
}
export default ProductsOutputsService;
