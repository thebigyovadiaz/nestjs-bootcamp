import { Container } from "../container/container";
import { ComponentRegistry } from "../components/component-registry";

import {
  USER_CONTROLLER,
  USER_REPOSITORY,
  USER_SERVICE
} from "../container/tokens";

import { MemoryUserRepository } from "../../repositories/memory/memory-user.repository";
import { UsersService } from "../../services/users.service";
import { IUserRepository } from "../../repositories/contracts/user.repository";
import { UserController } from "../../controller/users.controller";

export function registerApplicationComponents(
  container: Container,
  registry: ComponentRegistry
): void {

  container.register(
    USER_REPOSITORY,
    () => new MemoryUserRepository()
  );

  registry.register(
    USER_REPOSITORY,
    MemoryUserRepository,
    "repository"
  );

  container.register(
    USER_SERVICE,
    () => new UsersService(
      container.resolve<IUserRepository>(
        USER_REPOSITORY
      )
    )
  );

  registry.register(
    USER_SERVICE,
    UsersService,
    "service"
  );

  container.register(
    USER_CONTROLLER,
    () => new UserController(
      container.resolve<UsersService>(
        USER_SERVICE
      )
    )
  );

  registry.register(
    USER_CONTROLLER,
    UserController,
    "controller"
  );
}
