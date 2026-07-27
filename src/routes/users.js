const methodAllowed = require("../utils/methodAllowed")
const resJSON = require("../utils/response")

const users = (req, res) => {
    if (methodAllowed(req, res)) return

    if (req.method === 'GET') {
        return resJSON(res, 200, {
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
    }

    if (req.method === 'POST') {
        return resJSON(res, 201, {
            success: true,
            message: "User created",
            data: null
        })
    }
}

module.exports = users
