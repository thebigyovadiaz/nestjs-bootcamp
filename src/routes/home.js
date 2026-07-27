const resJSON = require("../utils/response")

const home = (req, res) => {
    return resJSON(res, 200, {
        success: true,
        message: "Welcome to NestJs Bootcamp",
        data: null
    })
}

module.exports = home
