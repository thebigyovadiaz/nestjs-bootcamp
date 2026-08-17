import "reflect-metadata";

export const ROUTE_METADATA = Symbol("ROUTE_METADATA");
export const METHOD_METADATA = Symbol("METHOD_METADATA");

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

function createMethodDecorator(method: HttpMethod) {

  return (path = ""): MethodDecorator => {

    return (target, propertyKey, descriptor) => {

      // Validation
      if (!descriptor || typeof descriptor.value !== "function") {
        throw new Error(`@${method} only works on methods`);
      }

      Reflect.defineMetadata(
        METHOD_METADATA,
        method,
        target,
        propertyKey
      );

      Reflect.defineMetadata(
        ROUTE_METADATA,
        path,
        target,
        propertyKey
      );
    };
  };
}

export const Get = createMethodDecorator("GET");
export const Post = createMethodDecorator("POST");
export const Put = createMethodDecorator("PUT");
export const Patch = createMethodDecorator("PATCH");
export const Delete = createMethodDecorator("DELETE");
