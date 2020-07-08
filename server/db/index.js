const mysql = require('mysql');
const express = require('express');

const mysqlConnection =  mysql.createConnection({
    user: 'root',
    password: 'Chewbacca980',
    database: 'database_node',
    host: 'localhost',
    port: '3306',
    multipleStatements: true,

});

mysqlConnection.connect((err) => {
    if(!err){
        console.log("DB Connection Successful")
    }
    else{
        console.log('DB Conncection Failed \n Error: ' + JSON.stringify(err,undefined,2));
    }
})

app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get a user
app.get('/users/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM users WHERE userid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete a user
app.delete('/users/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE userid = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Add a user
app.post('/users', (req, res) => {
    let emp = req.body;
    var sql = "SET @userid = ?;SET @username = ?;SET @password = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

//Update a user
app.put('/users', (req, res) => {
    let user = req.body;
    var sql = "SET @userid = ?;SET @username = ?;SET @password = ?;\
    CALL EmployeeAddOrEdit(@userid,@username,@password);";
    mysqlConnection.query(sql, [user.userid, user.username, user.password], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});