import api from './api';

class CategoriesService {

    static list(params) {
        let url = '/categories?page=' + (params.page ? params.page : 1);
        if (params.sort && params.sort.column) {
            const order = params.sort.order && params.sort.order === 'DESC' ? '-' : '+'; 
            url += `&sort=${order}${params.sort.column}`;
        }
        if (params.search) {
            url += `&search=${params.search}`;
        }
        return api.get(url);
    }

    static delete(categoryId) {
        return api.delete(`/categories/${categoryId}`);
    }

    static save(category) {
        let method = 'post';
        let url = '/categories';
        if (category && category.id) {
            method = 'put';
            url += `/${category.id}`;
        }
        return api[method](url, category);
    }
}
export default CategoriesService;
