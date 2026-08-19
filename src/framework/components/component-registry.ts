import { ComponentAlreadyRegisteredError } from "../../errors/components.error";
import { ComponentDefinition } from "../../interfaces";
import { ComponentType } from "../../types";

export class ComponentRegistry {
  private components = new Map<symbol, ComponentDefinition>();

  register(token: symbol, target: Function, type: ComponentType): void {
    if (this.components.has(token)) {
      throw new ComponentAlreadyRegisteredError(
        `Component with token ${token.toString()} is already registered.`
      );
    }

    this.components.set(token, {
      token,
      target,
      type
    });
  }

  get(token: symbol): ComponentDefinition | undefined {
    return this.components.get(token);
  }

  getByType(type: ComponentType): ComponentDefinition[] {
    return [...this.components.values()]
      .filter(component => component.type === type);
  }
}
