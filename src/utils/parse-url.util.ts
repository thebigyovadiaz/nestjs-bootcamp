import { ParseRequest, Request } from "../interfaces"

export const parseUrlPath = (path: string): string[] => {
  return path.split("/").filter(Boolean)
}

export const parseRequest = (req: Request): ParseRequest => {
  const query: Record<string, string> = {}
  const url = new URL(req.url || "localhost", `http://${req.headers.host}`)

  for (const param of url.searchParams) {
    const [key, value] = param
    query[key] = value
  }

  return {
    method: req.method || "GET",
    pathname: url.pathname,
    partsUrl: parseUrlPath(url.pathname),
    query,
  }
}
