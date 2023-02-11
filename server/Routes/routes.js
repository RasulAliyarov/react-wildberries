const Router = require("express")
const router = new Router
const controller = require("../Controller/user-controller")
const { body } = require("express-validator")

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 4, max: 32 }),
    body("username").notEmpty(),
    body("repeatpassword").notEmpty(),
    body("fullname").notEmpty(), controller.Registration)
router.post("/login", controller.Login)
router.post("/logout", controller.Logout)
router.get("/activate/:link", controller.Activate)
router.get("/refresh", controller.Refresh)

router.get("/users", controller.GetUsers)
router.put("/deleteUser/:id", controller.DeleteUser)

router.get("/products", controller.GetProducts)
router.get("/products/:id", controller.GetProductsById)
router.post("/addProduct", controller.AddProduct)
router.put("/deleteProduct/:id", controller.DeleteProduct)
router.put("/updateProduct/:id", controller.UpdateProduct)

module.exports = router
