const UserModel = require("../Models/user-model")
const userService = require("../Services/user-service")
const { validationResult, cookie } = require("express-validator")
const ApiError = require("../exceptions/api-error")

class UserController {
    async Registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }

            const {fullname, phonenumber, email, username, password, repeatpassword } = req.body

            const userData = await userService.registration(fullname, phonenumber, email, username, password, repeatpassword)
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    // LOGIN
    async Login(req, res, next) {
        try {
            const { username, password } = req.body;
            const userData = await userService.login(username, password)
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.send(userData)
        }
        catch (e) {
            next(e)
        }
    }

    // ACTIVATE
    async Activate(req, res, next) {
        try {
            const activationLink  = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        }
        catch (e) {
            next(e)
        }
    }

    // LOGOUT
    async Logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        }
        catch (e) {
            next(e)
        }
    }

    // REFRESH
    async Refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookie;
            const userData = await userService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        }
        catch (e) {
            next(e)

        }
    }

    // GET USERS
    async GetUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.send(users)
        }
        catch (e) {
            next(e)
        }
    }

    // GET GetProducts
    async GetProducts(req, res, next) {
        try {
            con
            res.send("salam")
        }
        catch (e) {
            next(e)
        }
    }

    // GET GetProductsById
    async GetProductsById(req, res, next) {
        try {
            con
            res.send("salam")
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController