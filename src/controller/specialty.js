const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'mysql.cristoematos.com.br',
    user: 'cristoematos',
    password: 'Lucas2906',
    database: 'cristoematos'
});


connection.connect(function (err) {
    if (err) throw err
    console.log("connection sucess")
})

exports.get = ((req, res) => {
    connection.query("select * from specialty", function (err, rows, fields) {
        console.log(err)
        if (!err) {
            res.status(200).send({ data: rows });
        } else {
            res.status(400).send({
                message: "erro ao realizar a consulta",
                data: rows
            });

        }
    });
})

exports.post = ((req, res) => {

    const { name } = req.body

    connection.query(`INSERT INTO specialty(name) VALUES ('${name}')`, function (err, rows, result) {
        if (!err) {

            res.status(200).send({
                message: 'especialidade cadastrada com sucesso!'
            });

        } else {
            res.status(400).send({
                message: "Erro ao cadastra a especialidade!",
                erro: err
            });

        }
    });
})

exports.put = ((req, res) => {

    const { name } = req.body

    connection.query(`UPDATE specialty SET name = ${name} where id = ${req.body.id}`, function (err, rows, result) {
        if (!err) {

            res.status(200).send({
                message: 'especialidade atualizada com sucesso!'
            });

        } else {
            res.status(400).send({
                message: "Erro ao atualizar especialidae!",
                erro: err
            });

        }
    });
})

exports.delete = ((req, res) => {
    connection.query(`DELETE  FROM specialty WHERE id_specialty =${req.body.id_specialty}`, function (err, rows, result) {
        if (!err) {
            res.status(200).send({
                message: 'especialidade apagada com sucesso!'
            });
        } else {
            res.status(400).send({
                message: "Erro ao apagar especialidae!" + err,
                erro: err
            });
        }
    });
})