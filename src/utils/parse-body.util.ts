import { Request } from "../interfaces";

export const parseBody = (req: Request): Promise<object> => {

  return new Promise((resolve, reject) => {
    let body = ""

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString()
    })

    req.on("end", () => {
      try {
        if (!body.trim()) {
            return resolve({})
        }

        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })

    req.on("error", reject)
  })
}
