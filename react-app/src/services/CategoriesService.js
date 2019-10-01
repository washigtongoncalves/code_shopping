import api from './api';

class CategoriesService {

    static list(params) {
        let url = `/categories?page=${params.page}`;
        if (params.sort && params.sort.column) {
            const order = params.sort.order && params.sort.order === 'DESC' ? '-' : '+'; 
            url += `&sort=${order}${params.sort.column}`;
        }
        return api.get(url);
    }
}
export default CategoriesService;
