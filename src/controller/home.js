const resJSON = require("../utils/response")

const home = (req, res) => (
    resJSON(res, 200, {
        success: true,
        message: "Welcome to NestJs Bootcamp",
        data: null
    })
)

module.exports = home
