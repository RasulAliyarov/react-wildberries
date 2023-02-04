const Router = require("express")
const router = new Router
const authController = require("../Controller/authController")
const { check } = require("express-validator")

router.post("/registration",
    check("password", "Пароль должен состоять мин. из 4").isLength({ min: 4 }),
    check("username", "Введите имя пользователя").notEmpty(),
    check("repeatpassword", "Повторите пароль").notEmpty(),
    check("phonenumber", "Введите номер мобильного телефона").notEmpty(),
    check("fullname", "Введите имя и фамилию").notEmpty(),
    check("email", "Введите eмейл").notEmpty(),
    authController.Registration)
router.post("/login", authController.Login)
router.get("/users", authController.GetUsers)
router.get("/logout", authController.Logout)

module.exports = router
