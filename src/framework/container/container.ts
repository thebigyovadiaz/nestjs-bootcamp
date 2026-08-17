import { DependencyAlreadyRegisteredError, DependencyNotRegisteredError } from "../../errors/dependency.error"
import { DependencyDefinition } from "../../interfaces"

class Container {
  private factories = new Map<symbol, () => unknown>();
  private instances = new Map<symbol, unknown>();
  private dependencies = new Map<symbol, DependencyDefinition>();

  register<T>(token: symbol, factory: () => T): void {
    if (this.factories.has(token)) {
      throw new DependencyAlreadyRegisteredError(`Dependency with token ${token.toString()} already registered`)
    }
    this.factories.set(token, factory)
  }

  resolve<T>(token: symbol): T {
    const dependency = this.dependencies.get(token);
    if (!dependency) {
      throw new DependencyNotRegisteredError(
        `Dependency ${token.toString()} is not registered`
      );
    }

    if (!dependency.instance) {
      dependency.instance = dependency.factory();
    }

    return dependency.instance as T;
  }

  entries(): DependencyDefinition[] {
    return [...this.dependencies.values()];
  }
}

export const container = new Container()
