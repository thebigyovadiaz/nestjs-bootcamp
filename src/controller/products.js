const methodAllowed = require("../utils/methodAllowed")
const resJSON = require("../utils/response")

const getProducts = (req, res) => (
    resJSON(res, 200, {
        success: true,
        message: "Products fetched successfully",
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
)

module.exports = {
    getProducts
}
