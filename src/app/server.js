const http = require("http")
const users = require("../routes/users")
const products = require("../routes/products")
const home = require("../routes/home")

const server = http.createServer((req, res) => {
    if (req.url == "/users") {
        return users(req, res)
    }

    if (req.url == "/") {
        return home(req, res)
    }

    if (req.url == "/products") {
        return products(req, res)
    }

    res.statusCode = 404
    res.end("Not Found")
})

server.listen(3000, () => console.log('Server running in local port 3000'))
