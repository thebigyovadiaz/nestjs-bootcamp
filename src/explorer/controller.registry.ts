export const controllers: Function[] = []

export function exploreControllers() {
  for (const controller of controllers) {
    console.log(controller.name);

    const methods = Object.getOwnPropertyNames(controller.prototype)
    console.log('methods :>> ', methods);
  }
}
