const UserModel = require("../Models/user-model")
const RoleModel = require("../Models/roles-model")
const ProductModel = require("../Models/products-model")
const TokenModel = require("../Models/token-model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("../Services/token-service")
const UserDto = require("../dtos/user-dto")
const ApiError = require("../exceptions/api-error")

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
    async deleteUser(id) {
        const user = UserModel.findByIdAndUpdate(id, {deleteState: true});
        console.log(user, "sasa")
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
        const userCookie = data.headers?.cookie.value
        const userToken = await TokenModel.findOne({ userCookie })
        if (!userToken) {
            throw new Error("Не удалось добавить товар")
        }
        const newProduct = new ProductModel({
            user: userToken.user,
            ...data.body
        });
        return newProduct;
    }

    async deleteProduct(id) {
        const product = ProductModel.findByIdAndUpdate(id, {deleteState: true});
        return product;
    }

    async updateProduct(req) {
        const { name, category, brand, count, image, desc, color } = req.body
        const product = ProductModel.findByIdAndUpdate(req.params.id, {
            name: name,
            category: category,
            brand: brand,
            image: image,
            count: count,
            color: color,
            desc: desc

        });
        return product;
    }
}

module.exports = new UserService();