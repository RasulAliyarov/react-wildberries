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

router.get("/users", controller.GetUsers)
router.get("/getUserById/:id", controller.GetUserById)
router.delete("/deleteUser/:id", roleMiddleWare(["ADMIN"]), controller.DeleteUser)
router.put("/editUser/:id", roleMiddleWare(["ADMIN", "SELLER", "USER"]), controller.EditUser)


router.get("/categories", controller.GetCategories)
router.post("/addCategory", roleMiddleWare(["ADMIN"]), controller.AddCategory)
router.put("/updateCategoryByName/:name",
    body("categoryName").notEmpty(), roleMiddleWare(["ADMIN"]), controller.UpdateCategoryByName)
router.delete("/deleteCategory/:name", roleMiddleWare(["ADMIN"]), controller.DeleteCategory)

router.get("/getSells", roleMiddleWare(["ADMIN", "SELLER", "USER"]), controller.GetSells)
// router.get("/getSells", roleMiddleWare(["ADMIN"]), controller.GetSells)
router.get("/getSellsById/:id", controller.GetSellsById)
router.post("/newSell", controller.NewSell)

router.get("/products", controller.GetProducts)
router.get("/products/:id", controller.GetProductsById)
router.post("/addProduct", roleMiddleWare(["ADMIN", "SELLER"]), controller.AddProduct)
router.delete("/deleteProduct/:id", roleMiddleWare(["ADMIN", "SELLER"]), controller.DeleteProduct)
router.put("/restoreProduct/:id", roleMiddleWare(["SELLER"]), controller.RestoreProduct)
router.put("/updateProduct/:id", roleMiddleWare(["ADMIN", "SELLER"]), controller.UpdateProduct)

router.put("/updateStatus/:id", controller.ChangeStatus)
router.put("/addToFavorite/:id", controller.AddToFavorite)
router.put("/deleteFavorite/:id", controller.DeleteFavorite)
module.exports = router
