const resJSON = require("../utils/response")

const routeNotFound = (req, res) => (
    resJSON(res, 404, {
        success: false,
        message: "Route not found",
        data: null
    })
)

module.exports = routeNotFound
