const methodAllowed = (req, res) => {
    if (req.method !== "GET" && req.method !== "POST") {
        res.statusCode = 405
        res.end(JSON.stringify({
            success: false,
            message: "Method Not Allowed",
            data: null
        }))

        return true
    }

    return false
}

module.exports = methodAllowed
