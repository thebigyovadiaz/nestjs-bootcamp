import "reflect-metadata";
import { HttpMethod } from "../../types/index.type";
import { RouteDefinition } from "../../interfaces";
import { ROUTES_METADATA } from "../metadata/metadata.keys";

function createMethodDecorator(method: HttpMethod) {
  return (path = ""): MethodDecorator => {
    return (target, propertyKey) => {
      const existingRoutes: RouteDefinition[] =
        Reflect.getMetadata(
          ROUTES_METADATA,
          target.constructor
        ) ?? [];

      existingRoutes.push({
        method,
        path,
        propertyKey
      });

      Reflect.defineMetadata(
        ROUTES_METADATA,
        existingRoutes,
        target.constructor
      );
    };
  };
}

export const Get = createMethodDecorator("GET");
export const Post = createMethodDecorator("POST");
export const Put = createMethodDecorator("PUT");
export const Patch = createMethodDecorator("PATCH");
export const Delete = createMethodDecorator("DELETE");
