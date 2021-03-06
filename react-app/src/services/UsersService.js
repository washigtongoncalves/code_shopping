import api from './api';

class UsersService {

    static list(params) {
        const page = params.page ? params.page : 1;
        const trashed = params.onlyTrashed ? 1 : 0;
        let url = `/users?page=${page}&trashed=${trashed}`;
        if (params.sort && params.sort.column) {
            const order = params.sort.order && params.sort.order === 'DESC' ? '-' : '+'; 
            url += `&sort=${order}${params.sort.column}`;
        }
        if (params.search) {
            url += `&search=${params.search}`;
        }
        return api.get(url);
    }

    static restore(userId) {
        return api.patch(`/users/${userId}/restore?trashed=1`);
    }

    static delete(userId) {
        return api.delete(`/users/${userId}`);
    }

    static save(user) {
        let method = 'post';
        let url = '/users';
        if (user && user.id) {
            method = 'put';
            url += `/${user.id}`;
        }
        return api[method](url, user);
    }
}
export default UsersService;
