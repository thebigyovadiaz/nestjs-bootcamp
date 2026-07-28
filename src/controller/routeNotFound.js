const logger = require("../middlewares/logger")
const resJSON = require("../utils/response")

const routeNotFound = (req, res) => {
    return resJSON(res, 404, {
        success: false,
        message: "Route not found"
    })
}

module.exports = routeNotFound
