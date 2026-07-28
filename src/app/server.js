const http = require("http")
const { routes, get, post, put, del, use, resolve } = require("./router")

const home = require("../controller/home")
const routeNotFound = require("../controller/routeNotFound")
const { getProducts } = require("../controller/products")
const { getUsers, newUser } = require("../controller/users")
const logger = require("../middlewares/logger")
const auth = require("../middlewares/auth")

// Middleware Register
use(logger)
use(auth)

// Routes Register
get("/", home)
get("/products", getProducts)
get("/users", getUsers)
post("/users", newUser)

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const key = `${req.method}:${url.pathname}`
    return resolve(key, req, res)
})

server.listen(3000, () => console.log('Server running in local port 3000'))
