import "reflect-metadata";

import { ExploredRoute, RouteDefinition } from "../../interfaces";
import { ApplicationContext } from "../application/application-context";
import { CONTROLLER_METADATA, ROUTES_METADATA } from "../metadata/metadata.keys";
import { ControllerMetadata } from "../metadata/controller.metadata";
import { combinePaths } from "../../utils/route-path.util";
import { ControllerInstance, Handler } from "../../types/index.type";
import { RouteHandlerError } from "../../errors/route.error";
import { ControllerMissingMetadataError } from "../../errors/controller.error";

export class RouteExplorer {
  constructor(
    private readonly context: ApplicationContext
  ) {}
  explore(): ExploredRoute[] {
    const controllers =
      this.context.getComponentsByType("controller");

    const exploredRoutes: ExploredRoute[] = [];

    for (const controller of controllers) {
      const controllerMetadata =
        Reflect.getMetadata(
          CONTROLLER_METADATA,
          controller.target
        ) as ControllerMetadata | undefined;

      if (!controllerMetadata) {
        throw new ControllerMissingMetadataError(
          `Controller ${controller.target.name} is missing @Controller metadata.`
        );
      }

      const routeDefinitions =
        Reflect.getMetadata(
          ROUTES_METADATA,
          controller.target
        ) as RouteDefinition[] | undefined;

      if (!routeDefinitions) {
        continue;
      }

      const controllerInstance =
        this.context.resolve<ControllerInstance>(
          controller.token
        );

      for (const route of routeDefinitions) {
        const handler =
          controllerInstance[route.propertyKey];

        if (typeof handler !== "function") {
          throw new RouteHandlerError(
            `Route handler ${String(
              route.propertyKey
            )} in controller ${controller.target.name} is not a function.`
          );
        }

        exploredRoutes.push({
          method: route.method,
          path: combinePaths(
            controllerMetadata.path,
            route.path
          ),
          handler: handler.bind(controllerInstance),
        });
      }
    }

    return exploredRoutes;
  }
}
