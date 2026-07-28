import http, { ServerResponse, IncomingMessage } from 'http';
import { get, post, use, resolve } from './router';

import { home } from '../controller/home'
import { getProducts } from '../controller/products'
import { getUsers, newUser } from '../controller/users'
import { logger } from '../middlewares/logger'
import { auth } from '../middlewares/auth'

// Middleware Register
use(logger)
use(auth)

// Routes Register
get("/", home)
get("/products", getProducts)
get("/users", getUsers)
post("/users", newUser)

export const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url || "localhost", `http://${req.headers.host}`)
    const key = `${req.method}:${url.pathname}`
    return resolve(key, req, res)
})

server.listen(3000, () => console.log('Server running in local port 3000'))
