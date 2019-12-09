import api from './api';

class ProductsService {

    static list(params) {
        const page = params.page ? params.page : 1;
        const trashed = params.onlyTrashed ? 1 : 0;
        let url = `/products?page=${page}&trashed=${trashed}`;
        if (params.sort && params.sort.column) {
            const order = params.sort.order && params.sort.order === 'DESC' ? '-' : '+'; 
            url += `&sort=${order}${params.sort.column}`;
        }
        if (params.search) {
            url += `&search=${params.search}`;
        }
        return api.get(url);
    }

    static restore(productId) {
        return api.patch(`/products/${productId}/restore?trashed=1`);
    }

    static delete(productId) {
        return api.delete(`/products/${productId}`);
    }
}
export default ProductsService;
