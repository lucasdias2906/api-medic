const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const router = express.Router();

const medicRoutes = require("./routes/medic")
const specialtyRoutes = require("./routes/specialty")
const indexRoutes = require("./routes/index")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use("/medic", medicRoutes)
app.use("/specialty", specialtyRoutes)
app.use("/", indexRoutes)

app.use((req, res, next) => {
    const erro = new error("nao encontrado");
    erro.status = 404;
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app