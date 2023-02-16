import _api from "../http";

export default class UserService {
    static async getUsers() {
        return _api.get("/users")
    }
    static async deleteUser(id, getData) {
        return _api.put(`/deleteUser/${id}`).then(() => getData())
    }

    static async deleteProduct(id, getData, accessToken) {
        console.log(accessToken)
        return _api.put(`/deleteProduct/${id}`,{}, { headers: { "Authorization": `Bearer ${accessToken}` } }).then(() => getData())
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
        return _api.put(`/deleteCategory/${name}`)
    }
}