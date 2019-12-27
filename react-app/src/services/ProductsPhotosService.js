import api from './api';

class ProductsPhotosService {
    
    static getPhotos(productId) {
        return api.get(`/products/${productId}/photos`);
    }
}
export default ProductsPhotosService;
