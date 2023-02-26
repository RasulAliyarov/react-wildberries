const UserModel = require("../Models/user-model")
const RoleModel = require("../Models/roles-model")
const ProductModel = require("../Models/products-model")
const TokenModel = require("../Models/token-model")
const CategoryModel = require("../Models/category-model")
const SellsModel = require("../Models/sells-model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("../Services/token-service")
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")
const { default: mongoose } = require("mongoose")

class UserService {
    async registration(fullname, phonenumber, email, username, password, repeatpassword) {

        const condidateEmail = await UserModel.findOne({ email })
        const condidateUsername = await UserModel.findOne({ username })
        if (condidateEmail) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        else if (condidateUsername) {
            throw ApiError.BadRequest(`Пользователь с именем ${username} уже существует`)
        }
        else if (password != repeatpassword) {
            throw new Error("Павторно введенный пароль не верный!")
        }
        const userRole = await RoleModel.findOne({ value: "USER" })
        const hashPassword = await bcrypt.hash(password, 7)
        const activationLink = uuid.v4();

        const user = await UserModel.create({ fullname, phonenumber, email, username, password: hashPassword, roles: [userRole.value], activationLink })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.activated = true;
        await user.save();
    }

    async login(username, password) {
        const user = await UserModel.findOne({ username });

        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден");
        }
        if (user.deleteState) {
            throw ApiError.BadRequest("Пользователь не найден");
        }
        if (user.roles.map((r) => r) === "ADMIN") {
            throw ApiError.BadRequest("Пользователь не найден");
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async loginAdmin(username, password) {
        const user = await UserModel.findOne({ username });

        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден");
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль");
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.Unauthorized();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async getAllUsers() {
        const users = UserModel.find();
        return users;
    }

    async getUserById(id) {
        const users = UserModel.findById({ _id: id }).populate("favorite").exec()
        return users;
    }

    async deleteUser(id) {
        const user = UserModel.findByIdAndUpdate(id, { deleteState: true });
        return user;
    }
    async editUser(req) {
        const { phonenumber, country, email, postIndex, bankCard, fullname, username } = req.body
        const user = UserModel.findByIdAndUpdate(req.params.id, {
            phonenumber: phonenumber,
            postIndex: postIndex,
            country: country,
            bankCard: bankCard,
            email: email,
            fullname: fullname,
            username: username,

        });
        return user;
    }

    async getProdcts() {
        const products = ProductModel.find();
        return products;
    }

    async getProductsById(id) {
        const products = ProductModel.findById(id);
        return products;
    }

    async addProduct(data) {
        const userCookie = data.headers?.cookie?.value
        const userToken = await TokenModel.findOne({ userCookie })
        if (!userToken) {
            throw new Error("Не удалось добавить товар")
        }
        let parseToken = JSON.parse(Buffer.from(userToken.refreshToken.split('.')[1], 'base64').toString())

        const newProduct = new ProductModel({
            user: parseToken.id,
            ...data.body
        });
        return newProduct;
    }

    async deleteProduct(id) {
        const product = ProductModel.findByIdAndUpdate(id, { deleteState: true });
        return product;
    }

    async restoreProduct(id) {
        const product = ProductModel.findByIdAndUpdate(id, { deleteState: false });
        return product;
    }

    async updateProduct(req) {
        const { name, category, brand, price, count, image, desc, color } = req.body
        const product = ProductModel.findByIdAndUpdate(req.params.id, {
            name: name,
            category: category,
            brand: brand,
            image: image,
            count: count,
            color: color,
            desc: desc,
            price: price,

        });
        return product;
    }


    async updateStatus(req) {
        const { phonenumber, postIndex, country } = req.body
        const userRole = await RoleModel.findOne({ value: "SELLER" })
        // let condidate = await findOne({_id: })
        if (!condidate.bankCard || !condidate.country || !condidate.postIndex || !condidate.phonenumber) return res.status(400).send("Не все данные введены профиль")

        const user = UserModel.findByIdAndUpdate(req.params.id, {
            roles: [userRole.value],
            phonenumber: phonenumber,
            postIndex: postIndex,
            country: country,
        });
        return user;
    }

    async addToFavorite(req) {
        const user = await UserModel.findOne({ _id: req.params.id })
        if (!user) throw new Error("Пользователь не найден")

        const newFav = await UserModel.findByIdAndUpdate(req.params.id, {
            favorite: [
                ...user.favorite,
                req.body.data
            ]
        });
        return newFav;
    }
    async deleteFavorite(req) {
        const user = await UserModel.findOne({ _id: req.params.id })
        if (!user) throw new Error("Пользователь не найден")

        let o_id = new mongoose.Types.ObjectId(req.body?.favId);

        const indexFav = user?.favorite.indexOf(o_id)
        user?.favorite?.splice(indexFav, 1)

        const updateFav = await UserModel.findByIdAndUpdate(req.params.id, {
            favorite: [
                ...user?.favorite
            ]
        });
        return updateFav;
    }


    async getCategories() {
        const categories = await CategoryModel.find();
        return categories;
    }


    async addCategory(categoryName, categoryİmage) {
        const checkCategory = await CategoryModel.findOne({ categoryName: categoryName });
        if (checkCategory) {
            throw new Error("Category already have ")
        }

        const newCategory = await new CategoryModel({
            categoryName: categoryName,
            categoryİmage: categoryİmage
        });
        return newCategory;
    }
    async deleteCategory(name) {
        const category = await CategoryModel.findOneAndUpdate({ categoryName: name }, { deleteState: true });
        return category;
    }
    async updateCategory(req) {
        const { categoryName, categoryİmage } = req.body
        let name = req.params.name
        const searchCategory = await CategoryModel.findOne({ categoryName: name });
        if (!searchCategory) {
            throw new Error("Category not found")
        }

        const checkCategory = await CategoryModel.findOne({ categoryName: categoryName });
        if (checkCategory) {
            throw new Error("Category already have ")
        }

        const updateCategory = await CategoryModel.findOneAndUpdate({ categoryName: name }, {
            categoryName: categoryName,
            categoryİmage: categoryİmage
        });
        return updateCategory;
    }


    async getAllSells() {
        const sells = SellsModel
            .find()
            .populate("productId", "user name brand price image color")
            .populate("userId", "username email country phonenumber postIndex")
            .exec();
        return sells;
    }
    async getSellsById(id) {
        const sells = SellsModel.findById(id);
        return sells;
    }
    async newSell(data) {
        const condidate = await UserModel.findOne({ _id: data.userId })
        if (!condidate.activated || !condidate.bankCard || !condidate.country || !condidate.postIndex || !condidate.phonenumber) return res.status(400).send("Не все данные введены профиль")

        const newSell = await new SellsModel({
            productId: data.productId,
            userId: data.userId
        });
        return newSell;
    }

}

module.exports = new UserService();