import { Container } from '../container/container';
export class Application {

  constructor(
    private readonly container: Container
  ) {}
  bootstrap(): void {
    console.log('Application bootstrapping...');
  }

  listen(port: number): void {
    console.log('Application listening on port ', port);
  }
}
