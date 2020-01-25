// conexao com BD Mysql
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

    const { name, crm, phone, state, city } = req.body

    connection.query(`INSERT INTO medico(name, crm,phone,state,city) VALUES (${name}, ${crm},${phone},'${state},${city})`, function (err, result) {
        if (!err) {
            console.log('Usuario cadastrado com sucesso!');
        } else {
            console.log('Erro ao cadastra o usuario!');
        }
    });
})

exports.put = ((req, res) => {
    connection.query(`UPDATE medico SET name = ${name} WHERE id = 1`, function (err, result) {
        if (!err) {
            console.log('Usuario editado com sucesso!');
        } else {
            console.log('Erro: o usuario não foi editado com sucesso!');
        }
    });
})

exports.delete = ((req, res) => {
    connection.query("DELETE FROM medico WHERE id = 2", function (err, result) {
        if (!err) {
            console.log("Usuario apagado com sucesso!");
        } else {
            console.log("Erro: o usuario não foi apagado com sucesso!");
        }
    });
})


