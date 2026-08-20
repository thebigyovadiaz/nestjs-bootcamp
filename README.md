# Mini TypeScript Backend Framework

A lightweight HTTP backend framework built **from scratch with TypeScript and Node.js**, inspired by architectural concepts used by frameworks such as NestJS.

> This project was created for educational purposes to understand what happens behind abstractions such as Dependency Injection, decorators, metadata discovery, routing, middleware pipelines, and application bootstrapping.

The goal is **not to replace NestJS**, but to understand the architectural mechanisms that frameworks like NestJS abstract away.

---

## 🚀 Features

The framework currently supports:

* Dependency Injection Container
* Dependency tokens using `Symbol`
* Lazy dependency initialization
* Singleton dependency resolution
* Component Registry
* Application Context
* Controllers
* HTTP method decorators
* Runtime metadata with `reflect-metadata`
* Automatic route discovery
* Dynamic route parameters
* Request body parsing
* Query parameters
* Middleware pipeline
* Automatic handler binding
* HTTP server bootstrap
* Custom framework errors
* Fail-fast configuration validation

---

## 🧠 Architecture

The framework follows a separation-of-concerns approach:

```text
Application
    │
    ├── Container
    │      └── Dependency creation and resolution
    │
    ├── ComponentRegistry
    │      └── Component discovery and classification
    │
    ├── ApplicationContext
    │      └── Abstraction over application components
    │
    ├── RouteExplorer
    │      └── Metadata discovery and route composition
    │
    ├── Router
    │      └── HTTP route matching and execution
    │
    └── Middleware Pipeline
           └── Request processing chain
```

The design intentionally separates:

```text
Discovery
Registration
Resolution
Execution
```

instead of placing all responsibilities inside a single component.

---

## 🔄 Request Flow

A request travels through the framework approximately as follows:

```text
HTTP Request
     │
     ▼
Application
     │
     ▼
HTTP Server
     │
     ▼
Router
     │
     ├── Method matching
     ├── Path matching
     ├── Dynamic parameters
     ├── Query parsing
     └── Body parsing
     │
     ▼
Middleware Pipeline
     │
     ▼
Controller Handler
     │
     ▼
HTTP Response
```

Routes are discovered before requests are processed:

```text
@Controller / @Get / @Post
           │
           ▼
        Metadata
           │
           ▼
   ComponentRegistry
           │
           ▼
    RouteExplorer
           │
           ▼
    ExploredRoute[]
           │
           ▼
         Router
```

---

## 🎯 Controllers

Controllers can declare a base path using the `@Controller()` decorator.

```ts
@Controller("/users")
export class UserController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get("/")
  getUsers(req: Request, res: ServerResponse): void {
    // ...
  }

  @Get("/:id")
  getUser(req: Request, res: ServerResponse): void {
    // ...
  }

  @Post("/new-user")
  createUser(req: Request, res: ServerResponse): void {
    // ...
  }
}
```

The controller does not manually register its routes with the Router.

Instead, decorators store metadata that is later interpreted by the `RouteExplorer`.

---

## 🪄 Decorators & Metadata

HTTP decorators are declarative.

For example:

```ts
@Get("/:id")
getUser() {}
```

produces route metadata conceptually equivalent to:

```ts
{
  method: "GET",
  path: "/:id",
  propertyKey: "getUser"
}
```

The decorator itself does **not**:

* instantiate the controller;
* resolve dependencies;
* register anything in the Router;
* execute the handler.

Those responsibilities belong to other framework components.

This keeps decorators focused exclusively on declaring metadata.

---

## 🔍 Route Discovery

`RouteExplorer` discovers registered controllers through the `ApplicationContext`.

Conceptually:

```text
ApplicationContext
       │
       ▼
getComponentsByType("controller")
       │
       ▼
ComponentDefinition[]
       │
       ├── Read Controller metadata
       ├── Read Route metadata
       ├── Resolve controller instance
       ├── Compose route paths
       └── Bind handler
       │
       ▼
ExploredRoute[]
```

A route declared as:

```ts
@Controller("/users")

@Get("/:id")
getUser() {}
```

becomes:

```text
GET /users/:id
```

with a handler already bound to its controller instance.

The Router therefore does not need to understand decorators or controller metadata.

---

## 📦 Dependency Injection

Dependencies are registered using tokens and factories.

```ts
export const USER_REPOSITORY =
  Symbol("USER_REPOSITORY");

export const USER_SERVICE =
  Symbol("USER_SERVICE");

export const USER_CONTROLLER =
  Symbol("USER_CONTROLLER");
```

Example registration:

```ts
container.register(
  USER_REPOSITORY,
  () => new MemoryUserRepository()
);

container.register(
  USER_SERVICE,
  () => new UsersService(
    container.resolve(USER_REPOSITORY)
  )
);

container.register(
  USER_CONTROLLER,
  () => new UserController(
    container.resolve(USER_SERVICE)
  )
);
```

The Container supports lazy singleton resolution:

```text
register(factory)
      │
      │
      └── instance not created yet
              │
              ▼
          resolve()
              │
        instance exists?
          │         │
         NO        YES
          │         │
       factory()    │
          │         │
          └────┬────┘
               ▼
        return instance
```

Once created, the same instance is returned by subsequent resolutions.

---

## 🗂️ Component Registry

Dependency creation and component discovery are intentionally separated.

### Container

Responsible for:

```text
How do I create and resolve this dependency?
```

### ComponentRegistry

Responsible for:

```text
What components exist in the application?
```

A component definition contains information such as:

```ts
interface ComponentDefinition {
  token: symbol;
  target: Function;
  type: ComponentType;
}
```

Supported component types include:

```ts
type ComponentType =
  | "controller"
  | "service"
  | "repository";
```

This allows framework components to discover specific categories without owning dependency creation.

---

## 🌐 Application Context

`ApplicationContext` provides an abstraction between framework consumers and the internal Container/Registry infrastructure.

Instead of:

```text
RouteExplorer
   │
   ├── Container
   └── ComponentRegistry
```

the framework uses:

```text
RouteExplorer
      │
      ▼
ApplicationContext
      │
   ┌──┴──┐
   ▼     ▼
Container ComponentRegistry
```

This reduces direct coupling between framework components.

---

## 🛣️ Router

The Router is responsible for HTTP execution concerns.

It supports:

* HTTP method matching
* static routes
* dynamic route parameters
* query parameters
* request body parsing
* middleware execution
* handler execution
* 404 responses
* error handling

For example:

```text
GET /users/:id
```

can match:

```text
GET /users/42
```

and produce:

```ts
request.params = {
  id: "42"
};
```

The Router receives already explored routes:

```ts
{
  method: "GET",
  path: "/users/:id",
  handler: boundHandler
}
```

It does not need to know which controller or decorator produced them.

---

## 🔗 Middleware

Middleware can be registered through the application:

```ts
app.use(middlewares.logger);
app.use(middlewares.auth);
```

Execution follows a `next()`-based pipeline:

```text
Request
   │
   ▼
Logger
   │
 next()
   │
   ▼
Auth
   │
 next()
   │
   ▼
Controller Handler
```

A middleware can stop the chain by not calling `next()`.

---

## 🏗️ Application Bootstrap

The public application API is intentionally small:

```ts
const app = new Application();

app.use(middlewares.logger);
app.use(middlewares.auth);

app.bootstrap();

app.listen(8080);
```

`Application` acts as the **composition root** of the framework.

During bootstrap:

```text
Application.bootstrap()
        │
        ├── Register dependencies
        ├── Register components
        │
        ▼
RouteExplorer.explore()
        │
        ▼
ExploredRoute[]
        │
        ▼
Router registration
```

`listen()` creates the underlying Node.js HTTP server and delegates incoming requests to the Router.

---

## 📐 Design Principles

Several architectural principles guided the implementation.

### Single Responsibility

Each component owns a specific concern.

### Dependency Inversion

High-level framework components avoid depending directly on low-level infrastructure where an abstraction makes sense.

### Fail Fast

Invalid framework configuration should fail during application bootstrap instead of waiting for an HTTP request to expose the problem.

### Single Source of Truth

Metadata should not be duplicated unnecessarily.

For example, the HTTP method belongs to the route definition rather than being stored under multiple metadata keys.

### Explicit Dependency Tokens

`Symbol` tokens are preferred over strings to provide unique dependency identities and avoid accidental collisions.

### Avoid Global Mutable State

Infrastructure such as the DI Container belongs to the `Application` instance instead of being exposed as a global singleton.

---

## 🧪 Example Routes

A controller such as:

```ts
@Controller("/users")
export class UserController {
  @Get("/")
  getUsers() {}

  @Post("/new-user")
  newUser() {}

  @Get("/:id")
  getUser() {}
}
```

is automatically discovered as:

```text
GET   /users
POST  /users/new-user
GET   /users/:id
```

No manual route registration is required.

---

## 🎓 What I Learned

Building this project helped reinforce concepts that are usually hidden behind framework abstractions:

* Dependency Injection
* Inversion of Control
* Dependency tokens
* Factories
* Lazy initialization
* Singleton lifecycle
* Decorators
* Runtime metadata
* Reflection
* Component discovery
* Application contexts
* Composition roots
* Route discovery
* Handler binding
* Middleware pipelines
* Dynamic routing
* Fail-fast validation
* Separation of concerns
* SOLID principles

Most importantly, the project helped connect these concepts into a complete framework lifecycle:

```text
Declaration
    ↓
Metadata
    ↓
Discovery
    ↓
Registration
    ↓
Dependency Resolution
    ↓
Route Exploration
    ↓
HTTP Execution
```

---

## 💡 Why Build a Framework From Scratch?

Modern frameworks provide powerful abstractions:

```ts
@Controller()
@Injectable()
@Get()
@Post()
```

Those abstractions are convenient, but they can hide important architectural concepts.

Building a small framework from scratch provides a better understanding of:

* why Dependency Injection containers exist;
* how decorators can describe application behavior;
* how metadata can drive runtime discovery;
* how controllers are instantiated;
* how routes can be discovered automatically;
* why application contexts exist;
* how middleware chains work;
* how framework responsibilities can be separated.

That knowledge makes it easier to reason about production frameworks such as NestJS instead of treating them as magic.

---

## ⚠️ Project Scope

This is an **educational framework**, not a production replacement for NestJS, Express, Fastify, or other mature frameworks.

Features such as the following were intentionally left outside the scope:

* production-grade security;
* advanced dependency scopes;
* modules;
* guards;
* pipes;
* interceptors;
* exception filters;
* WebSockets;
* microservice transports;
* advanced validation;
* production observability;
* performance optimization.

The project is considered complete once its core architectural goals are demonstrated.

The next step is applying these concepts using **NestJS**.

---

## 🛠️ Tech Stack

* Node.js
* TypeScript
* `reflect-metadata`
* Node.js HTTP module

---

## 📄 License

This project is intended primarily for learning, experimentation, and architectural exploration.
