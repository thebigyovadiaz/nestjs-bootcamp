import { ControllerDefinition } from "../interfaces";

export const controllers = new Set<ControllerDefinition>()

export function exploreControllers() {
  for (const controller of controllers) {
    console.log(controller.name);

    const methods = Object.getOwnPropertyNames(controller.prototype)
    console.log('methods :>> ', methods);
  }
}
