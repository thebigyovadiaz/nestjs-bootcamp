import { ComponentDefinition } from "../../interfaces";
import { ApplicationContext } from "../application/application-context";
import { CONTROLLER_METADATA } from "../metadata/metadata.keys";

export class RouteExplorer {
  constructor(
    private readonly context: ApplicationContext
  ) {}
  
  explore(controllers: ComponentDefinition[]): void {
    for (const controller of controllers) {
      const metadata = Reflect.getMetadata(
        CONTROLLER_METADATA,
        controller.target
      );

      if (!metadata) {
        continue;
      }

      console.log('Controller >> ', controller.target.name);
      console.log('Path >> ', metadata.path);
    }
  }
}
