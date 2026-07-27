const methodAllowed = require("../utils/methodAllowed")
const resJSON = require("../utils/response")

const products = (req, res) => {
    if (methodAllowed(req, res)) return

    if (req.method === 'GET') {
        return resJSON(res, 200, {
            success: true,
            message: "Products list",
            data: [
                {
                    name: "towel",
                    ID: "1234",
                    price: "5$"
                },
                {
                    name: "paper",
                    ID: "1235",
                    price: "10$"
                }
            ]
        })
    }
}

module.exports = products
