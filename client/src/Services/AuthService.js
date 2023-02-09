import _api from "../http";

export default class AuthService {
    static async login(username, password) {
        return _api.post("/login", { username, password })
    }
    static async registration( fullname, phonenumber, email, username, password, repeatpassword) {
        return _api.post("/registration", { fullname, phonenumber, email, username, password, repeatpassword })
    }
    static async logout() {
        return _api.post("/logout")
    }
}