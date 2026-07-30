
export const parseUrlPath = (path: string): string[] => {
  return path.split("/").filter(Boolean)
}
