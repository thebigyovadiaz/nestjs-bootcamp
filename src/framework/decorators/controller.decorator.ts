import 'reflect-metadata'
import { controllers } from '../../framework/container/container'

export const CONTROLLER_PATH = Symbol("CONTROLLER_PATH");

export function Controller(path: string): ClassDecorator {
  return function(target: Function) {
    Reflect.defineMetadata(
      CONTROLLER_PATH,
      path,
      target
    )

    controllers.add(target)
  }
}
