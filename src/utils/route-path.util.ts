export function combinePaths(
  controllerPath: string,
  routePath: string
): string {
  const controller = controllerPath.trim();
  const route = routePath.trim();

  if (!controller && !route) {
    return "/";
  }

  if (!controller) {
    return normalizePath(route)
  }

  if (!route) {
    return normalizePath(controller)
  }

  return normalizePath(`${controller}/${route}`)
}

function normalizePath(path: string): string {
  const normalized = `/${path}`.replace(/\/+/g, "/");

  if (normalized.length > 1 && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }

  return normalized;
}
