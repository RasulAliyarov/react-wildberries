import _api from "../http";

export default class UserService {
    static async getUsers() {
        return _api.get("/users")
    }
    static async deleteUser(id, getData) {
        return _api.put(`/deleteUser/${id}`).then(() => getData())
    }

    static async deleteProduct(id, getData) {
        return _api.put(`/deleteProduct/${id}`).then(() => getData())
    }
    static async updateProduct(id, data) {
        return _api.put(`/updateProduct/${id}`, { ...data })
    }

}