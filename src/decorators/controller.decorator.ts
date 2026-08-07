import 'reflect-metadata'
import { controllers } from '../explorer/controller.registry'

export const PATH_METADATA = "path"

export function Controller(path: string) {
  return function(target: Function) {
    Reflect.defineMetadata(
      PATH_METADATA,
      path,
      target
    )

    controllers.push(target)
  }
}
