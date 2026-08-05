export class Container {
  private services = new Map()

  register<T>(token: Symbol, instance: T) {
    this.services.set(token, instance)
  }

  resolve<T>(token: Symbol): T {
    return this.services.get(token)
  }
}
