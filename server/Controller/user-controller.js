const userService = require("../Services/user-service")
const { validationResult, cookie } = require("express-validator")
const ApiError = require("../exceptions/api-error")
const ProductModel = require("../Models/products-model")
const TokenModel = require("../Models/token-model")

class UserController {
    async Registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }

            const { fullname, phonenumber, email, username, password, repeatpassword } = req.body

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
            const activationLink = req.params.link;
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
            const { refreshToken } = req.cookies;
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
    // GET USERS
    async DeleteUser(req, res, next) {
        try {
            await userService.deleteUser(req.params.id)
            res.json("Пользователь удален")
        }
        catch (e) {
            next(e)
        }
    }



    // GET GetProducts
    async GetProducts(req, res, next) {
        try {
            const products = await userService.getProdcts()
            return res.send(products)
        }
        catch (e) {
            next(e)
        }
    }

    // GET GetProductsById
    async GetProductsById(req, res, next) {
        try {
            const products = await userService.getProductsById(req.params.id)
            return res.send(products)
        }
        catch (e) {
            next(e)
        }
    }

    // POST AddProduct
    async AddProduct(req, res, next) {
        try {
            const newProduct = await userService.addProduct(req);
            newProduct.save()
            res.json(newProduct)
        }
        catch (e) {
            next(e)
        }
    }
    // DELETE DeleteProduct
    async DeleteProduct(req, res, next) {
        try {
            await userService.deleteProduct(req.params.id)
            res.json("Товар удален")
        }
        catch (e) {
            next(e)
        }
    }

    // UPDATE UpdateProduct
    async UpdateProduct(req, res, next) {
        try {
            await userService.updateProduct(req)
            res.json("Товар изменен")
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController