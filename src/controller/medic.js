// conexao com BD Mysql
const mysql = require("mysql");

const connection = mysql.createConnection({
    multipleStatements: true,
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
    connection.query(`select medico.id_medico, medico.name,medico.crm,medico.phone,medico.state,medico.city, specialty.name as specialty from medic_specialty_join inner join medico on medico.id_medico = medic_specialty_join.id_medic inner join specialty on specialty.id_specialty= medic_specialty_join.id_specialty
    ORDER BY medico.id_medico ASC`,
        function (err, rows, fields) {
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

    const { name, crm, phone, state, city, especialidade } = req.body

    connection.query(`INSERT INTO medico(name, crm,phone,state,city) VALUES ('${name}', ${crm},${phone},'${state}','${city}' ); INSERT INTO specialty( name) VALUES ("${especialidade}") `, function (err, rows, fields) {
    connection.query(` INSERT INTO medic_specialty_join (id_medico, id_speacialty) VALUES ('${id_medico}','${id_specialty}')`)    

        if (!err) {

            res.status(200).send({
                message: 'Usuario cadastrado com sucesso!'
            });

        } else {
            res.status(400).send({
                message: "Erro ao cadastra o usuario!",
                erro: err
            });

        }
    });
})

exports.put = ((req, res) => {

    const { name, phone, state, city, id_specialty } = req.body

    connection.query(`UPDATE medico set name = ${name}, phone = ${phone} , state = ${state} city = ${city}, id_specialty = ${id_specialty} where id_medico=${req.body.id_medico}`, function (err, rows, result) {
        if (!err) {

            res.status(200).send({
                message: 'Usuario atualizado com sucesso!'
            });

        } else {
            res.status(400).send({
                message: "Erro ao atualizar o usuario!",
                erro: err
            });

        }
    });
})

exports.delete = ((req, res) => {



    connection.query(`DELETE FROM medico WHERE id_medico = ${req.body.id_medico}`, function (err, rows, result) {
        if (!err) {

            res.status(200).send({
                message: 'Usuario deletado com sucesso!'
            });

        } else {
            res.status(400).send({
                message: "Erro ao deletar o usuario!" + err,
                erro: err
            });

        }
    });
})


