import { DependencyAlreadyRegisteredError } from "../errors/dependency.error"

class Container {
  private factories = new Map<symbol, () => unknown>()
  private instances = new Map<symbol, unknown>()

  register<T>(token: symbol, factory: () => T): void {
    if (this.factories.has(token)) {
      throw new DependencyAlreadyRegisteredError(`Dependency with token ${token.toString()} already registered`)
    }
    this.factories.set(token, factory)
  }

  resolve<T>(token: symbol): T {
    let instance = this.instances.get(token)
    if (instance) {
      return instance as T
    }

    const factory = this.factories.get(token)
    if (!factory) {
      throw new DependencyAlreadyRegisteredError(`Dependency with token ${token.toString()} didn't registered`)
    }

    instance = factory()
    this.instances.set(token, instance)
    return instance as T
  }
}

export const container = new Container()
