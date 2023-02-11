import _api from "../http";

export default class AuthService {
    static login(username, password) {
        return _api.post("/login", { username, password })
    }
    static registration(fullname, phonenumber, email, username, password, repeatpassword) {
        return _api.post("/registration", { fullname, phonenumber, email, username, password, repeatpassword })
    }
    static logout() {
        return _api.post("/logout")
    }
}