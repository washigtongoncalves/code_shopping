import api from './api';

class ProductsCategoriesService {
    
    static getCategories(productId) {
        let url = `/products/${productId}/categories/`;
        return api.get(url);
    }
}
export default ProductsCategoriesService;
