import { ComponentRegistry } from '../components/component-registry';
import { Container } from '../container/container';
import { ApplicationContext } from './application-context';
export class Application {
  private readonly container: Container;
  private readonly componentRegistry: ComponentRegistry;
  private readonly context: ApplicationContext;

  constructor() {
    this.container = new Container();
    this.componentRegistry = new ComponentRegistry();

    this.context = new ApplicationContext(
      this.container,
      this.componentRegistry
    );
  }
  bootstrap(): void {
    console.log('Application bootstrapping...');
  }

  listen(port: number): void {
    console.log('Application listening on port ', port);
  }
}
