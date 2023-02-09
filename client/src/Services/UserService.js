import _api from "../http";

export default class UserService {
    static async getUsers() {
        return _api.get("/users")
    }

}