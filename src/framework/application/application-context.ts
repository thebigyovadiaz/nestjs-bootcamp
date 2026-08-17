import { Container } from '../container/container';

export class ApplicationContext {
  constructor(
    private readonly container: Container
  ) {}

  resolve<T>(token: symbol): T {
    return this.container.resolve<T>(token);
  }
}
