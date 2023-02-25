import _api from "../http";

export default class UserService {
    static async getUsers() {
        return _api.get("/users")
    }
    static async deleteUser(id, getData) {
        return _api.delete(`/deleteUser/${id}`).then(() => getData())
    }

    static async deleteProduct(id, getData) {
        return _api.delete(`/deleteProduct/${id}`).then(() => getData())
    }
    static async restoreProduct(id, getData) {
        return _api.put(`/restoreProduct/${id}`).then(() => getData())
    }
    static async updateProduct(id, data) {
        return _api.put(`/updateProduct/${id}`, { ...data })
    }
    static updateStatus(id, data) {
        return _api.put(`/updateStatus/${id}`, { ...data })
    }
    static async addToFavorite(id, data) {
        return _api.put(`/addToFavorite/${id}`, { data })
    }

    static async updateCategory(name, data) {
        return _api.put(`/updateCategoryByName/${name}`, { ...data })
    }
    static async deleteCategory(name) {
        return _api.delete(`/deleteCategory/${name}`)
    }
    static async deleteFavorite(id, favId, getFavorite) {
        return _api.put(`/deleteFavorite/${id}`, { favId: favId }).then(() => getFavorite())
    }
}