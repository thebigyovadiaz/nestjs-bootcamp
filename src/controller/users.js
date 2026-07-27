const methodAllowed = require("../utils/methodAllowed")
const resJSON = require("../utils/response")

const getUsers = (req, res) => (
    resJSON(res, 200, {
        success: true,
        message: "Users list",
        data: [
            {
            name: "Peter Rose",
            ID: "1234",
            email: "peterr@gmail.com"
            },
            {
                name: "Elena Petric",
                ID: "12345",
                email: "petricelena@gmail.com"
            }
        ]
    })
)

const newUser = (req, res) => (
    resJSON(res, 201, {
        success: true,
        message: "User created",
        data: null
    })
)

module.exports = {
    getUsers,
    newUser
}
