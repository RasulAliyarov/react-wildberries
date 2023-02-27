const userService = require("../Services/user-service")
const { validationResult, cookie } = require("express-validator")
const ApiError = require("../exceptions/api-error")
const ProductModel = require("../Models/products-model")
const TokenModel = require("../Models/token-model")
const RoleModel = require("../Models/token-model")
const UserModel = require("../Models/user-model")
const SellsModel = require("../Models/sells-model")
const CategoryModel = require("../Models/category-model")

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

    // LoginAdmin
    async LoginAdmin(req, res, next) {
        try {
            const { username, password } = req.body;
            const userData = await userService.loginAdmin(username, password)
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
    // REFRESH
    async AdminRefresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie("adminRefreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
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

    // GET GetUserById
    async GetUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            return res.send(user)
        }
        catch (e) {
            next(e)
        }
    }

    // GET DELETE
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
    // DELETE RestoreProduct
    async RestoreProduct(req, res, next) {
        try {
            await userService.restoreProduct(req.params.id)
            res.json("Товар востановлен")
        }
        catch (e) {
            next(e)
        }
    }

    // UPDATE EditUser
    async EditUser(req, res, next) {
        try {
            await userService.editUser(req)
            res.json("Данные пользователя изменены")
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

    // UPDATE UpdateProduct
    async ChangeStatus(req, res, next) {
        try {
            await userService.updateStatus(req)
            res.json("Статус изменен")
            console.log("message1")
        }
        catch (e) {
            next(e)
        }
    }

    // PUT AddToFavorite
    async AddToFavorite(req, res, next) {
        try {
            await userService.addToFavorite(req);
            res.json("Продукт в добавлен в избранное")
        }
        catch (e) {
            next(e)
        }
    }
    // DELETE DeleteFavorite
    async DeleteFavorite(req, res, next) {
        try {
            await userService.deleteFavorite(req)
            res.json("Избранное удалено")
        }
        catch (e) {
            next(e)
        }
    }
    
    //  GET GetCategories
    async GetCategories(req, res, next) {
        try {
            const categories = await userService.getCategories();
            return res.send(categories)
        }
        catch (e) {
            next(e)
        }
    }

    //  Post AddCategory
    async AddCategory(req, res, next) {
        try {
            const { categoryName, categoryİmage } = req.body
            const newCategory = await userService.addCategory(categoryName, categoryİmage);
            newCategory.save()
            res.json("Категория добавлена")
        }
        catch (e) {
            next(e)
        }
    }

    // UPDATE UpdateCategoryById
    async UpdateCategoryByName(req, res, next) {
        try {
            await userService.updateCategory(req)
            res.json("Категория изменена")
        }
        catch (e) {
            next(e)
        }
    }

    // DELETE DeleteCategories
    async DeleteCategory(req, res, next) {
        try {
            await userService.deleteCategory(req.params.name)
            res.json("Категория удаленa")
        }
        catch (e) {
            next(e)
        }
    }



    // GET Sells
    async GetSells(req, res, next) {
        try {
            const sells = await userService.getAllSells();
            return res.send(sells)
        }
        catch (e) {
            next(e)
        }
    }
    // GET Sells
    async GetSellsById(req, res, next) {
        try {
            const sells = await userService.getSellsById(req.params.id)
            return res.send(sells)
        }
        catch (e) {
            next(e)
        }
    }
    // POST NewSell
    async NewSell(req, res, next) {
        try {
            const newSell = await userService.newSell(req.body);
            newSell.save()
            res.json(newSell)
        }
        catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController