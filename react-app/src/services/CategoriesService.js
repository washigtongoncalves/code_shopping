import api from './api';

class CategoriesService {
    static list() {
        return api.get('/categories');
    }
}
export default CategoriesService;
