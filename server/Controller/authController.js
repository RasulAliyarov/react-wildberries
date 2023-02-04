const Role = require("../Models/Role")
const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")
const { secret } = require("../Config/config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secret, { expiresIn: 10 })
}

class authController {
    async Registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.json({ message: "Ошибка при регистрации", errors })
            }

            const { username, password, repeatpassword, phonenumber, fullname, email } = req.body

            const condidateName = await User.findOne({ username })
            const condidateEmail = await User.findOne({ email })
            const userRole = await Role.findOne({ value: "USER" })
            if (repeatpassword !== password) {
                return res.send("Пароли не совпадают")
            }
            else if (condidateName) {
                return res.send("Пользователь с таким именеи существует")
            }
            else if (condidateEmail) {
                return res.send("Пользователь с таким емейл-м существует")
            }

            const hashPassword = bcrypt.hashSync(password, 7)

            let newUser = new User({ username, password: hashPassword, phonenumber, fullname, email, roles: [userRole.value] })
            await newUser.save()

            res.send(`Вы зарегестрированы под именем ${username}`)
        }
        catch (e) {
            console.log(e)
            res.status(400).send("Registration error")
        }
    }

    // LOGIN
    async Login(req, res) {
        try {
            const { username, password } = req.body

            const user = await User.findOne({ username })
            if (!user) return res.status(400).send({ message: `Пользователь ${username} не найден` })

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) return res.status(400).send({ message: "Пароль не верный" })

            const token = generateAccessToken(user._id, user.roles)
            return res.send({ token })
        }
        catch (e) {
            console.log(e)
            res.status(400).send("Login error")
        }
    }

    Logout(req, res) {
        try {
            req.localStorage = null
            res.send("You are logout")
        }
        catch (e) {
            console.log(e)
        }
    }

    // GET USERS
    async GetUsers(req, res) {
        try {
            let userRole = new Role()
            let adminRole = new Role({ value: "ADMIN" })
            await userRole.save()
            await adminRole.save()

            res.send("salam")
        }
        catch (e) {
            console.log({ ERROR_MESSAGE: e })
            res.status(400).send("Not found data...")
        }
    }
}

module.exports = new authController