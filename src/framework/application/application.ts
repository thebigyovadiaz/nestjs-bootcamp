import { ComponentRegistry } from '../components/component-registry';
import { Container } from '../container/container';
import { registerDependencies } from '../container/register';
import { RouteExplorer } from '../router/route-explorer';
import { ApplicationContext } from './application-context';
import { register as registerRoute, resolve } from "../router/router";
import { registerApplicationComponents } from './register-application-components';
import { Middleware } from '../../types/index.type';
import { use } from '../../middlewares/register';
import { createServer } from 'node:http';
export class Application {
  private readonly container: Container;
  private readonly componentRegistry: ComponentRegistry;
  private readonly context: ApplicationContext;
  private readonly routeExplorer: RouteExplorer;

  constructor() {
    this.container = new Container();
    this.componentRegistry = new ComponentRegistry();

    this.context = new ApplicationContext(
      this.container,
      this.componentRegistry
    );

    this.routeExplorer =
      new RouteExplorer(this.context);
  }

  use(middleware: Middleware): void {
    use(middleware);
  }
  bootstrap(): void {
    registerApplicationComponents(
      this.container,
      this.componentRegistry
    );

    const routes =
      this.routeExplorer.explore();

    for (const route of routes) {
      registerRoute(
        route.method,
        route.path,
        route.handler
      );
    }
  }

  listen(port: number): void {
    const server = createServer((req, res) => {
      resolve(req, res);
    });

    server.listen(port, () => {
      console.log(
        `Application listening on port ${port}`
      );
    });
  }
}
