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

    static create(productId, categories) {
        let url = `/products/${productId}/categories/`;
        return api.post(url, { categories });
    }
}
export default ProductsCategoriesService;
