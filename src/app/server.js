const http = require("http")
const { routes, get, post, put, del } = require("./router")

const home = require("../controller/home")
const routeNotFound = require("../controller/routeNotFound")
const { getProducts } = require("../controller/products")
const { getUsers, newUser } = require("../controller/users")

// Routes Register
get("/", home)
get("/products", getProducts)
get("/users", getUsers)
post("/users", newUser)

const server = http.createServer((req, res) => {
    const key = `${req.method}:${req.url}`
    const handler = routes[key]

    if (!handler) {
        return routeNotFound(req, res)
    }

    return routes[key](req, res)
})

server.listen(3000, () => console.log('Server running in local port 3000'))
