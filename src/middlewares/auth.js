const resJSON = require("../utils/response")

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return resJSON(res, 401, {
            success: false,
            message: "Invalid Token"
        })
    }

    next()
}

module.exports = auth
