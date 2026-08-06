import { container } from "../container/container";
import { USER_CONTROLLER, USER_REPOSITORY, USER_SERVICE } from "../container/tokens";
import { generalCtrl } from "../controller/general.controller";
import { ProductsController } from "../controller/products.controller";
import { UserController } from "../controller/users.controller";
import { middlewares } from "../middlewares/middlewares";
import { use } from "../middlewares/register";
import { IUserRepository } from "../repositories/contracts/user.repository";
import { UsersService } from "../services/users.service";
import { get, post } from "./router";

// Register factories in container
import '../container/register'

const usersController = container.resolve<UserController>(USER_CONTROLLER)
const productsController = new ProductsController()

// Middleware Register
use(middlewares.logger)
use(middlewares.auth)

// Routes Register
get("/", generalCtrl.home.bind(generalCtrl))
get("/products", productsController.getProducts.bind(productsController))
get("/users", usersController.getUsers.bind(usersController))
get("/users/:id", usersController.getUser.bind(usersController))
get("/users/:id/orders/:order", usersController.getUser.bind(usersController))
post("/users", usersController.newUser.bind(usersController))
