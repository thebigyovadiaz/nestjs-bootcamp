import { container } from "../framework/container/container";
import { USER_CONTROLLER } from "../framework/container/tokens";
import { generalCtrl } from "../controller/general.controller";
import { ProductsController } from "../controller/products.controller";
import { UserController } from "../controller/users.controller";
import { middlewares } from "../middlewares/middlewares";
import { use } from "../middlewares/register";
import { get, post } from "./router";

// Register factories in container
import '../framework/container/register'
import { exploreControllers } from "../explorer/controller.registry";

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

const path = Reflect.getMetadata("path", UserController)
console.log('path :>> ', path);

exploreControllers()
