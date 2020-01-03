import api from './api';

class ProductsPhotosService {
    
    static getPhotos(productId) {
        return api.get(`/products/${productId}/photos`);
    }

    static delete(productId, photoId) {
        return api.delete(`/products/${productId}/photos/${photoId}`);
    }
}
export default ProductsPhotosService;
