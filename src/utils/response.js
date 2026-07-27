const resJSON = (res, status, data) => {
    res.writeHead(status, {
        "Content-Type": "application/json"
    })

    return res.end(JSON.stringify(data))
}

module.exports = resJSON
