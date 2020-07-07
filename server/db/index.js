const mysql = require('mysql');

const pool =  mysql.createPool({
    connectionLimit: 10,
    password: 'Chewbacca980',
    user: 'root',
    database: 'database_node',
    host: 'localhost',
    port: '3306',

});

let users = {};

users.all = () => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

users.one = (id) => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};


module.exports = users;