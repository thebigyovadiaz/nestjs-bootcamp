import { container } from "./container";
import { USER_CONTROLLER, USER_REPOSITORY, USER_SERVICE } from "./tokens";
import { MemoryUserRepository } from "../../repositories/memory/memory-user.repository";
import { UsersService } from "../../services/users.service";
import { IUserRepository } from "../../repositories/contracts/user.repository";
import { UserController } from "../../controller/users.controller";

container.register(
  USER_REPOSITORY,
  () => new MemoryUserRepository()
)

container.register(
  USER_SERVICE,
  () => new UsersService(
    container.resolve<IUserRepository>(USER_REPOSITORY)
  )
)

container.register(
  USER_CONTROLLER,
  () => new UserController(
    container.resolve<UsersService>(USER_SERVICE)
  )
)
