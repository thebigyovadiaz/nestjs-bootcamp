const logger = (req, res, next) => {
    const start = Date.now()

    res.on("finish", () => {
        const end = Date.now()
        console.log(`${req.method} ${req.url} ${res.statusCode} - ${end - start}ms`)
    })

    next()
}

module.exports = logger
