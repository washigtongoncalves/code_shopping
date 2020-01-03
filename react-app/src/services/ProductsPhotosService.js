import api from './api';

class ProductsPhotosService {
    
    static getPhotos(productId) {
        return api.get(`/products/${productId}/photos`);
    }

    static delete(productId, photoId) {
        return api.delete(`/products/${productId}/photos/${photoId}`);
    }

    static create(productId, files) {
        const formData = new FormData();
        const filesArray = Array.from(files);
        filesArray.forEach(file => {
            formData.append('photos[]', file);
        });
        const url = `/products/${productId}/photos`;
        return api.post(url, formData);
    }
}
export default ProductsPhotosService;
