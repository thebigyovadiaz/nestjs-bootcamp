import { ComponentDefinition } from '../../interfaces';
import { ComponentType } from '../../types/index.type';
import { ComponentRegistry } from '../components/component-registry';
import { Container } from '../container/container';

export class ApplicationContext {
  constructor(
    private readonly container: Container,
    private readonly componentRegistry: ComponentRegistry
  ) {}

  resolve<T>(token: symbol): T {
    return this.container.resolve<T>(token);
  }

  getComponentsByType(type: ComponentType): ComponentDefinition[] {
    return this.componentRegistry.getByType(type);
  }
}
