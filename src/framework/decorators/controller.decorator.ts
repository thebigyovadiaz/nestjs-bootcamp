import 'reflect-metadata'
import { CONTROLLER_METADATA } from '../metadata/metadata.keys'
import { ControllerMetadata } from '../metadata/controller.metadata';

export function Controller(path = "") {
  return function(target: Function) {
    const metadata: ControllerMetadata = {
      path
    }

    Reflect.defineMetadata(
      CONTROLLER_METADATA,
      metadata,
      target
    )
  }
}
