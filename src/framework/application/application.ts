import { container } from '../container/container';
export class Application {

  constructor() {}
  bootstrap(): void {
    console.log('Application bootstrapping...');
  }

  listen(port: number): void {
    console.log('Application listening on port ', port);
  }
}
