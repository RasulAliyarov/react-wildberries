const Router = require("express")
const router = new Router
const controller = require("../Controller/user-controller")
const { body } = require("express-validator")
const roleMiddleWare = require("../Middleware/role-middleware")


router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 4, max: 32 }),
    body("username").notEmpty(),
    body("repeatpassword").notEmpty(),
    body("fullname").notEmpty(), controller.Registration)
router.post("/login", controller.Login)
router.post("/loginAdmin", controller.LoginAdmin)
router.post("/logout", controller.Logout)
router.get("/activate/:link", controller.Activate)
router.get("/refresh", controller.Refresh)

router.get("/users", roleMiddleWare(["ADMIN"]), controller.GetUsers)
router.get("/getUserById/:id", controller.GetUserById)
router.put("/deleteUser/:id", roleMiddleWare(["ADMIN"]), controller.DeleteUser)


router.get("/categories", controller.GetCategories)
router.post("/addCategory", controller.AddCategory)
router.put("/updateCategoryByName/:name",
    body("categoryName").notEmpty(), controller.UpdateCategoryByName)
router.put("/deleteCategory/:name", controller.DeleteCategory)

router.get("/products", controller.GetProducts)
router.get("/products/:id", controller.GetProductsById)
router.post("/addProduct", roleMiddleWare(["ADMIN", "SELLER"]), controller.AddProduct)
router.put("/deleteProduct/:id", roleMiddleWare(["ADMIN", "SELLER"]), controller.DeleteProduct)
router.put("/updateProduct/:id", roleMiddleWare(["ADMIN", "SELLER"]), controller.UpdateProduct)

router.put("/updateStatus/:id", controller.ChangeStatus)
router.put("/addToFavorite/:id", controller.AddToFavorite)
module.exports = router
