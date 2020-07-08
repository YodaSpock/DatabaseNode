const mysql = require('mysql');

const connection =  mysql.createConnection({
    password: 'Chewbacca980',
    user: 'root',
    database: 'database_node',
    host: 'localhost',
    port: '3306',

});

connection.connect(function(error){
    if(!error){
        console.log('Connected To Database')
    }else{
        console.log(error);
    }
})

module.exports = connection;