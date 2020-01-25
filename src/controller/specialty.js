const mysql = require("mysql");

const connection = mysql.createConnection({
    host:'mysql.cristoematos.com.br',
    user: 'cristoematos',
    password: 'Lucas2906',
    database: 'cristoematos'
});


connection.connect(function(err){
    if(err)throw err
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

    connection.query(`INSERT INTO specialty(name) VALUES (${name},${id_medic})`, function (err, result) {
        if (!err) {
            console.log('especialidade cadastrada com sucesso!');
        } else {
            console.log('Erro ao cadastra a especialidade');
        }
    });
})

exports.put = ((req, res) => {
    connection.query(`UPDATE specialty SET name = ${name} WHERE id = 1`, function (err, result) {
        if (!err) {
            console.log('especialidade editado com sucesso!');
        } else {
            console.log('Erro: a especialidade não foi editada com sucesso!');
        }
    });
})

exports.delete = ((req, res) => {
    connection.query("DELETE FROM specialty WHERE id = 2", function (err, result) {
        if (!err) {
            console.log("especialidade apagada com sucesso!");
        } else {
            console.log("Erro: a especialidade não foi apagada com sucesso!");
        }
    });
})