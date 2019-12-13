import api from './api';

class ProductsCategoriesService {
    
    static getCategories(productId) {
        let url = `/products/${productId}/categories/`;
        return api.get(url);
    }

    static delete(productId, categoryId) {
        let url = `/products/${productId}/categories/${categoryId}`;
        return api.delete(url);
    }
}
export default ProductsCategoriesService;
