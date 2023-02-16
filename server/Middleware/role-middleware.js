const ApiError = require("../exceptions/api-error")
const jwt = require("jsonwebtoken")
const tokenService = require("../Services/token-service")

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") next()
        try {
            console.log(req.headers)
            // const token = req.body.headers?.Authorization?.split(" ")[1] BELE YAZANDA ISHLEYIR, MIDDLEWARE QOYMAYANDA DA ISHLEYIR
            const token = req.headers?.authorization?.split(" ")[1]
            if (!token) {
                throw ApiError.Unauthorized()
            }
            const userData = tokenService.validateAccessToken(token)
            if (!userData) {
                throw ApiError.Unauthorized()
            }
            const { roles: userRoles } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(400).json({ message: "У вас нет доступа" })
            }
            next();
        }
        catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
}