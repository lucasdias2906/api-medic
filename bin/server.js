const http = require('http');
const debug = require("debug")("nodestr:server")
const app = require("../src/app");
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
console.log("server okay port =>",port)
server.listen(port);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port
    }

    return false;
}